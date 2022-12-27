import Hub from "./client-types/Hub";
import Player from "./client-types/Player";
import GameMode from "./gamemodes/GameMode";
import GameParticipant from "./client-types/GameParticipant";
import Question from "./questions/Questions";

export default class Game {

    public readonly id:string;
    public readonly gamemode:GameMode;
    
    private static readonly OLD_PLAYERS_MEM = 10; // How many Players that have left are stored
    public readonly oldPlayers:Array<Player> = []; // FIFO queue of Players that left (newest -> oldest)
    public readonly players:Array<Player> = []; // current Players
    private hub:Hub|undefined; // Hub showing "projector" screen

    private questions:Array<Question>|undefined;
    private cqi = -1; // Current Question Index
    public get questionNumber() { return this.cqi+1; }
    public get currentQuestion() { return this.questions === undefined ? undefined : this.questions[this.cqi]; }
    /**
     * Gives the next Question.
     * @returns the next Question (undefined if not available)
     */
    public nextQuestion() { return this.questions ? this.questions[++this.cqi] : undefined }

    /**
     * Creates a new Game object.
     * @param id code/id of the Game
     * @param gamemode Gamemode to be played
     */
    constructor(id:string, gamemode:GameMode) {
        this.id = id;
        this.gamemode = gamemode;
    }

    /**
     * Adds a new Player or Hub to this Game.
     * @param client Player or Hub that joins
     */
    public connect(client:GameParticipant):boolean {
        if (client instanceof Player) {
            if (this.players.includes(client)) return false; // already in Game
            else {
                this.players.push(client);
                console.log(`Player ${client.id} joined Game ${this.id}.`);
        
                client.currentScreen = this.gamemode.standardScreens.namePickScreen;
    
                this.hub?.refreshScreen();
                return true;
            }
        }
        else if (client instanceof Hub) {
            if (this.hub === undefined) {
                this.hub = client;
                console.log(`Hub ${client.id} joined Game ${this.id}.`);

                client.currentScreen = this.gamemode.standardScreens.lobbyScreen;

                this.hub.refreshScreen();
                return true;
            }
            else {
                client.emit('show error message', this.gamemode.standardErrorMessages["setup/hub-already-present"]);
                return false;
            }
        }
        else return false;
        
    }

    /**
     * Removes a Player or Hub from this Game.
     * @param client Player or Hub that leaves
     * @returns true if a Player or Hub was removed, false otherwise
     */
    public disconnect(client:GameParticipant):boolean {
        if (client instanceof Player) {
            for (let i = 0; i < this.players.length; i ++) {
                if (this.players[i] === client) {
                    this.oldPlayers.unshift(this.players.splice(i,1)[0]);
                    while (this.oldPlayers.length > Game.OLD_PLAYERS_MEM) this.oldPlayers.pop();
    
                    console.log(`Player ${client.id} left Game ${this.id}.`);
                    this.hub?.refreshScreen();
                    return true;
                }
            }
    
            console.log(`Warning: Player ${client.id} is not Game ${this.id}.`);
            return false;
        }
        else if (client instanceof Hub) {
            if (this.hub === client) {
                console.log(`Hub ${client.id} left Game ${this.id}.`);
                
                this.hub = undefined;
                return true;
            }
            else return false;
        }
        else return false;
        
    }

    /**
     * Attempts to start this Game.
     * @returns true if game started, false otherwise
     */
    public doAttemptStart() {
        if (this.players.length >= this.gamemode.settings.minPlayers && this.gamemode.settings.canStart(this)) {
            this.doStart();
            return true;
        }
        else return false;
    }

    /**
     * Starts this Game.
     */
    private doStart() {
        this.questions = this.gamemode.generateQuestions(this); // generate Questions

        this.gamemode.standardEvents.onGameStart(this); // event

        this.doNextQuestion(); // prompt first Question
    }
    
    /**
     * This method prompts the next Question to the Players.
     */
    public doNextQuestion() {
        const question = this.nextQuestion();
        if (question === undefined) { // no more Questions
            this.doFinalResults();
        }
        else {
            // show screens
            this.hub!.currentScreen = question.hubScreen;
            this.players.forEach(player => {
                player.answer = undefined;
                player.currentScreen = question.playerScreen;
            });

            this.gamemode.standardEvents.onNewQuestion(question); // event hook
        }

    }

    /**
     * This method is called when the current Question is done.
     */
    public doEndQuestion() {
        this.players.sort((a, b) => b.points-a.points); // sort Players by points
        this.gamemode.standardEvents.onQuestionEnds(this, this.currentQuestion as Question);

        if (this.currentQuestion === this.questions?.at(-1)) { // last Question ended -> end Game
            this.doFinalResults();
        }
        else if (this.gamemode.settings.showIntermediateResults(this)) { // Gamemode wants to show intermediate results
            this.doIntermediateResults();
        }
        else this.doNextQuestion(); // prompt next Question
    }

    /**
     * This method shows the intermediate results.
     */
    public doIntermediateResults() {
        console.log(`Game ${this.id} finished.`);
        this.players.sort((a, b) => b.points-a.points); // sort Players by points

        this.gamemode.standardEvents.onIntermediateResults(this);
    }

    /**
     * This method is called when there are no more Questions left, showing the final results.
     */
    public doFinalResults() {
        console.log(`Game ${this.id} finished.`);
        this.players.sort((a, b) => b.points-a.points); // sort Players by points

        this.gamemode.standardEvents.onFinalResults(this);
    }

    /**
     * Checks whether a name has not been chosen by another Player.
     * @param name suggested name
     * @returns true if not yet picked, false otherwise
     */
    public isUsernameAvailable(username:string) {
        if (this.gamemode.settings.allowDuplicateNames) return true;

        return !this.players.some(player => {
            if (this.gamemode.settings.ignoreNameCapitalization) {
                return player.username?.toLocaleLowerCase() === username.toLocaleLowerCase();
            }
            else return player.username === username;
        });

    }

    /**
     * Gets an old Player who left, and removes them from the list.
     * @param username username of a Player who left.
     * @returns Player who left with given name (undefined if no such name)
     */
    public getOldPlayer(username:string) {
        for (let i = this.oldPlayers.length-1; i >= 0; i --) {
            if (this.oldPlayers[i].username === username) return this.oldPlayers.splice(i,1)[0];
        }

        return undefined;
    }

}
import Hub from "./client-types/Hub";
import Player from "./client-types/Player";
import GameMode from "./gamemodes/GameMode";
import GameParticipant from "./client-types/GameParticipant";
import Question from "./questions/Questions";
import DataStores from "../addons/DataStores";

export enum GamePhase {
    PRE,
    STARTING,
    QUESTION,
    INTERMEDIATE_RESULTS,
    FINAL_RESULTS,
    POST
}

export default class Game {

    public readonly dataStores:DataStores<Game>;

    public readonly id:string; // id of the Game
    public readonly gamemode:GameMode; // Gamemode being used for this Game

    private _phase:GamePhase = GamePhase.PRE;
    public get phase() { return this._phase; } // The GamePhase this Game is in
    
    private static readonly OLD_PLAYERS_MEM = 10; // How many Players that have left are stored
    public readonly oldPlayers:Array<Player> = []; // FIFO queue of Players that left (newest -> oldest)
    public readonly players:Array<Player> = []; // current Players
    private hub:Hub|undefined; // Hub showing "projector" screen

    private questions:Array<Question>|undefined; // list of Questions
    private cqi = -1; // Current Question Index
    public get questionNumber() { return this.cqi+1; } // Number of the current Question (1-indexed)
    public get currentQuestion() { return (this.questions??[])[this.cqi]; } // the current Question
    /**
     * Gives the next Question.
     * @returns the next Question (undefined if not available)
     */
    public nextQuestion() { return (this.questions??[])[++this.cqi]; }
    private currentQuestionTimeout?:NodeJS.Timeout;

    /**
     * Creates a new Game object.
     * @param id code/id of the Game
     * @param gamemode Gamemode to be played
     */
    constructor(id:string, gamemode:GameMode) {
        this.id = id;
        this.gamemode = gamemode;

        this.dataStores = new DataStores<Game>(...this.gamemode.addons.getDefaultStores(Game));
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
        if (this.players.length >= this.gamemode.settings.editable.minPlayers && this.gamemode.settings.canStart(this)) {
            this.doStart();
            return true;
        }
        else return false;
    }

    /**
     * Starts this Game.
     */
    private doStart() {
        this._phase = GamePhase.STARTING;

        this.questions = this.gamemode.generateQuestions(this); // generate Questions

        this.gamemode.standardEvents.onGameStart(this); // event

        this.doNextQuestion(); // prompt first Question
    }
    
    /**
     * This method prompts the next Question to the Players.
     */
    public doNextQuestion() {
        const question = this.nextQuestion();
        if (question !== undefined) {
            this._phase = GamePhase.QUESTION;

            // show screens
            this.hub!.currentScreen = question.screens.hub;
            this.players.forEach(player => {
                player.answer = undefined;
                player.currentScreen = question.screens.player;
            });

            // start timeout if needed
            if (question.timeout !== undefined) {
                this.currentQuestionTimeout = setTimeout(() => { // start timeout
                    console.log(`Game ${this.id} ended the Question through timeout.`);
                    this.doEndQuestion();
                }, question.timeout);
            }

            this.gamemode.standardEvents.onNewQuestion(question); // event hook
        }
        else console.log(`WARNING: Game ${this.id} attempted to use an undefined Question.`);

    }

    /**
     * This method is called when the current Question is done.
     */
    public doEndQuestion() {
        this.players.sort((a, b) => b.points-a.points); // sort Players by points
        this.players.forEach((p,i) => p.rank = i);

        this.gamemode.standardEvents.onQuestionEnds(this, this.currentQuestion as Question);  

        if (this._phase === GamePhase.QUESTION) {
            clearTimeout(this.currentQuestionTimeout); // clear timeout when needed

            if (this.questionNumber >= (this.questions?.length??0)) { // last Question ended -> end Game
                this.doFinalResults();
            }
            else if (this.gamemode.settings.showIntermediateResults(this)) { // Gamemode wants to show intermediate results
                this.doIntermediateResults();
            }
            else this.doNextQuestion(); // prompt next Question
        }
        else console.log(`WARNING: Cannot end Question outside of QUESTION GamePhase.`);
    }

    /**
     * This method shows the intermediate results.
     */
    public doIntermediateResults() {
        this._phase = GamePhase.INTERMEDIATE_RESULTS;

        this.players.sort((a, b) => b.points-a.points); // sort Players by points
        this.players.forEach((p,i) => p.rank = i);

        this.gamemode.standardEvents.onIntermediateResults(this);

        this.hub!.currentScreen = this.gamemode.standardScreens.intermediateResultsScreen.hub; // show Screen
        this.players.forEach(p => p.currentScreen = this.gamemode.standardScreens.intermediateResultsScreen.player);
    }

    /**
     * This method is called when there are no more Questions left, showing the final results.
     */
    public doFinalResults() {
        this._phase = GamePhase.FINAL_RESULTS;

        console.log(`Game ${this.id} ended.`);
        this.players.sort((a, b) => b.points-a.points); // sort Players by points
        this.players.forEach((p,i) => p.rank = i);

        this.gamemode.standardEvents.onFinalResults(this);

        this.hub!.currentScreen = this.gamemode.standardScreens.finalResultsScreen.hub; // show Screen
        this.players.forEach(p => p.currentScreen = this.gamemode.standardScreens.finalResultsScreen.player);
    }

    public doEndGame() {
        this._phase = GamePhase.POST;

        this.players.forEach
    }

    /**
     * Checks whether a name has not been chosen by another Player.
     * @param name suggested name
     * @returns true if not yet picked, false otherwise
     */
    public isUsernameAvailable(username:string) {
        if (this.gamemode.settings.editable.allowDuplicateNames) return true;

        return !this.players.some(player => {
            if (this.gamemode.settings.editable.ignoreNameCapitalization) {
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

    /**
     * Refreshes the Screens of every GameParticipant (Players and Hub) of this Game.
     */
    public refreshParticipantScreens() {
        [...this.players, this.hub].forEach(gp => gp?.refreshScreen());
    }

}
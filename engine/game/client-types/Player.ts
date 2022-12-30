import { Socket } from "socket.io";
import Game, { GamePhase } from "../Game";
import GameParticipant from "./GameParticipant";
import Answer from "../questions/Answer";
import DataStores from "../../addons/DataStores";

export default class Player extends GameParticipant {

    public readonly dataStores:DataStores<Player>;

    public username:string|undefined;
    /**
     * Whether this Player is done with their set up.
     */
    get isSetUp() { return this.username !== undefined && this.dataStores.allSetup(); }
    public points = 0;
    public rank = 0;
    public answer:Answer|undefined;

    /**
     * Creates a new Player in the context of a Game.
     * @param socket Socket the Player is connected through
     * @param game the Game the Player belongs to
     * @param dataStores the Addon-specific data packets
     */
    constructor(socket:Socket, game:Game, dataStores?:DataStores<Player>) {
        super(socket,game);

        // adding event handlers
        this.socket.on('disconnect', () => this.game.disconnect(this)); // leaving Game on disconnect
        this.socket.on('answer', answer => this.onAnswer(answer as Answer)); // submitting an answer

        this.dataStores = dataStores ?? new DataStores<Player>();
    }

    /**
     * Method that is called when the Player submits an Answer.
     * @param answer Player's Answer
     */
    private onAnswer(answer:Answer) {
        if (this.isSetUp) { // actual Answer to Question
            this.points += this.game.currentQuestion!.evaluate(answer); // evaluate answer and grant points
            this.answer = answer;
            console.log(`Player ${this.username} of Game ${this.game.id} answered:`);
            console.log(answer);

            this.currentScreen = this.game.gamemode.standardScreens.waitingScreen;

            this.game.refreshParticipantScreens();
            if (this.game.phase === GamePhase.QUESTION && this.game.gamemode.settings.canEndQuestion(this.game)) this.game.doEndQuestion();
        }
        else { // answer to set up Question
            if (this.username === undefined) { // name is chosen first
                if ('name' in answer && typeof answer.name === 'string') {
                    answer.name = answer.name.trim();

                    if (this.game.isUsernameAvailable(answer.name)) {
                        let oldMe = this.game.getOldPlayer(answer.name);
                        
                        if (oldMe !== undefined) {
                            this.copy(oldMe); // copy old Player data
                            console.log(`${oldMe.username} rejoined as ${this.id}.`);
                        }
                        else {
                            this.username = answer.name;

                            console.log(`Player ${this.id} chose name ${answer.name}`);
                            this.currentScreen = this.game.gamemode.standardScreens.waitingScreen;
                        }

                        this.game.refreshParticipantScreens();

                    }
                    else this.socket.emit('show error message', this.game.gamemode.standardErrorMessages["setup/duplicate-name-chosen"]); // feedback to player
                }
                else console.log('A username must be chosen first and must be a string.');
            }
            else {

            }
        }
    }

    /**
     * Copies the data from another Player to this one.
     * @param other Player to copy
     */
    public copy(other:Player) {
        this.username = other.username;

        this.points = other.points;
        this.answer = other.answer;

        this.currentScreen = other.currentScreen;
    }

}
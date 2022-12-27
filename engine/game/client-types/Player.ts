import { Socket } from "socket.io";
import Game from "../Game";
import GameParticipant from "./GameParticipant";
import Answer from "../questions/Answer";

export default class Player extends GameParticipant {

    public username:string|undefined;
    private _isSetUp = false;
    /**
     * Whether this Player is done with their set up.
     */
    get isSetUp() { return this._isSetUp; }
    public points = 0;
    public answer:Answer|undefined;

    /**
     * Creates a new Player in the context of a Game.
     * @param socket Socket the Player is connected through
     * @param game the Game the Player belongs to
     */
    constructor(socket:Socket, game:Game) {
        super(socket,game);

        // adding event handlers
        this.socket.on('disconnect', () => this.game.disconnect(this)); // leaving Game on disconnect
        this.socket.on('answer', answer => this.onAnswer(answer as Answer)); // submitting an answer
    }

    /**
     * Method that is called when the Player submits an Answer.
     * @param answer Player's Answer
     */
    private onAnswer(answer:Answer) {
        if (this.isSetUp) { // actual Answer to Question
            // evaluate answer
            this.points += this.game.currentQuestion!.eval(answer);
            this.answer = answer;
            console.log(`${this.username} of Game ${this.game.id} answered.`);

            this.currentScreen = this.game.gamemode.standardScreens.waitingScreen;

            this.game.onStateUpdated();
            if (this.game.gamemode.questionFinished(this.game)) this.game.onQuestionFinish();
        }
        else { // answer to set up Question
            if (this.username === undefined) { // name is chosen first
                if ('name' in answer && typeof answer.name === 'string') {
                    answer.name = answer.name.trim();

                    if (this.game.usenameAvailable(answer.name)) {
                        let oldMe = this.game.getOldPlayer(answer.name);
                        if (oldMe !== undefined) {
                            this.copy(oldMe); // copy old Player data
                            console.log(answer.name + ' rejoined.');
                            
                        }
                        this.username = answer.name;
                        this._isSetUp = true;
                        this.game.onStateUpdated();
                        console.log(`Player ${this.id} chose name: ${answer.name}`);

                        this.currentScreen = this.game.gamemode.standardScreens.waitingScreen;
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
        this.points = other.points;
        this.answer = other.answer;
        this.currentScreen = other.currentScreen;
    }

}
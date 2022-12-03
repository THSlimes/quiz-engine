import { Socket } from "socket.io";
import Client from "../../Client";
import HeaderUIComponent from "../../ui/components/HeaderUIComponent";
import Screen from "../../ui/Screen";
import Game from "../Game";
import Answer from "../questions/Answer";

export default class Player extends Client {

    public readonly game:Game; // Game this Player playing in

    public username:string|undefined;
    private _isSetUp = false;
    /**
     * Whether this Player is done with their set up.
     */
    get isSetUp() { return this._isSetUp; }
    public points = 0;
    public answer:Answer|undefined;

    private _currentScreen:Screen|undefined; // Screen being currently displayed for the Player
    set currentScreen(screen:Screen|undefined) {
        this._currentScreen = screen;
        this.socket.emit('draw screen', screen);        
    }
    get currentScreen() { return this._currentScreen; }

    constructor(socket:Socket, game:Game) {
        super(socket);
        this.game = game;

        // adding event handlers
        socket.on('disconnect', () => this.game.disconnect(this)); // leaving Game on disconnect
        socket.on('answer', answer => this.onAnswer(answer as Answer)); // submitting an answer
    }

    private onAnswer(answer:Answer) {
        if (this.isSetUp) { // actual Answer to Question

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
                        console.log(`Player ${this.id} chose name: ${answer.name}`);

                        this.currentScreen = new Screen('test', [
                            new HeaderUIComponent('Naam gekozen: ' + answer.name)
                        ]);
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
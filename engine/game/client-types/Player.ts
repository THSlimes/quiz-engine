import { Socket } from "socket.io";
import Client from "../../Client";
import Screen from "../../ui/Screen";
import Game from "../Game";
import Answer from "../questions/Answer";

export default class Player extends Client {

    public readonly game:Game; // Game this Player playing in

    public readonly username:string|undefined;
    public points = 0;
    public answer:Answer|undefined;

    private _currentScreen:Screen|undefined; // Screen being currently displayed for the Player
    set currentScreen(screen:Screen|undefined) {
        this._currentScreen = screen;
        this.socket.emit('draw screen', screen);
    }
    get currentScreen() {
        return this._currentScreen;
    }

    constructor(socket:Socket, game:Game) {
        super(socket);
        socket.on('disconnect', () => this.game.disconnect(this));

        this.game = game;
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
import { Socket } from "socket.io";
import Client from "./Client";
import Screen, { StaticScreen, RefreshableScreen } from "../../ui/Screen";
import Game from "../Game";

/**
 * A GameParticipant is any Client that is a
 * part of a certain Game's logic.
 */
export default abstract class GameParticipant extends Client {

    protected game:Game;

    private _currentScreen:Screen|undefined; // Screen being currently displayed for the Player
    set currentScreen(screen:Screen|undefined) {
        this._currentScreen = screen;
        if (screen instanceof StaticScreen) {            
            this.socket.emit('draw screen', screen.getSendable());
        }
        else if (screen === undefined) this.socket.emit('draw screen', screen);
        else this.socket.emit('draw screen', screen(this.game).getSendable());
    }
    get currentScreen() { return this._currentScreen; }

    constructor(socket:Socket, game:Game) {
        super(socket);
        this.game = game;

        this.socket.on('disconnect', () => this.game.disconnect(this));
    }

    /**
     * Reload the current Screen of this GameParticipant.
     */
    public refreshScreen() {
        // reloads current screen it is a RefreshableScreen
        if (!(this._currentScreen instanceof StaticScreen || this._currentScreen === undefined)) {
            this.socket.emit('draw screen', this._currentScreen(this.game).getSendable());
        }
    }

}
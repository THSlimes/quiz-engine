import { Socket } from "socket.io";
import Client from "../Client";
import Screen from "../ui/Screen";
import Game from "./Game";
import { RefreshableScreen } from "./gamemodes/GameMode";

/**
 * A GameParticipant is any Client that is a
 * part of a certain Game's logic.
 */
export default abstract class GameParticipant extends Client {

    protected game:Game;

    private _currentScreen:Screen|RefreshableScreen|undefined; // Screen being currently displayed for the Player
    set currentScreen(screen:Screen|RefreshableScreen|undefined) {
        this._currentScreen = screen;
        if (screen instanceof Screen || screen === undefined) {
            this.socket.emit('draw screen', screen);        
        }
        else this.socket.emit('draw screen', screen(this.game));
    }
    get currentScreen() { return this._currentScreen; }

    constructor(socket:Socket, game:Game) {
        super(socket);
        this.game = game;
    }

    /**
     * Reload the current Screen of this GameParticipant.
     */
    public refreshScreen() {
        // reloads current screen it is a RefreshableScreen
        if (!(this.currentScreen instanceof Screen) && this.currentScreen !== undefined) {
            this.currentScreen = this.currentScreen;
        }
    }

}
import { Socket } from "socket.io";
import Game from "../Game";
import GameParticipant from "./GameParticipant";

export default class Hub extends GameParticipant {

    constructor(socket:Socket, game:Game) {
        super(socket,game);

        // adding event handlers
        this.socket.on('disconnect', () => this.game.disconnect(this)); // leaving Game on disconnect
        this.socket.on('start game', this.startGame.bind(this));
    }

    private startGame() {
        if (!this.game.attemptStart()) {
            this.socket.emit('show error message', this.game.gamemode.standardErrorMessages["setup/cannot-start-game"]);
        }
    }

}
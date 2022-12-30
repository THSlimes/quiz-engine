import { Socket } from "socket.io";
import Game from "../Game";
import GameParticipant from "./GameParticipant";
import DataStores from "../../addons/DataStores";

export default class Hub extends GameParticipant {

    public readonly dataStores:DataStores<Hub>;

    constructor(socket:Socket, game:Game, dataStores?:DataStores<Hub>) {
        super(socket,game);

        // adding event handlers
        this.socket.on('disconnect', () => this.game.disconnect(this)); // leaving Game on disconnect
        this.socket.on('start game', this.startGame.bind(this));

        this.dataStores = dataStores ?? new DataStores<Hub>();

    }

    private startGame() {
        if (!this.game.doAttemptStart()) {
            this.socket.emit('show error message', this.game.gamemode.standardErrorMessages["setup/cannot-start-game"]);
        }
    }

}
import { Socket } from "socket.io";
import Client from "../../Client";
import Game from "../Game";

export default class Hub extends Client {

    public readonly game:Game; // Game this Hub is showing

    constructor(socket:Socket, game:Game) {
        super(socket);
        this.game = game
    }

}
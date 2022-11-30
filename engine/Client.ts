import { Socket } from "socket.io";

/**
 * A Client of a GameServer.
 */
export default class Client {

    public readonly id:string;
    protected readonly socket:Socket;
    protected readonly joinDate:Date;

    public constructor(socket:Socket) {
        this.socket = socket;
        this.id = this.socket.id;
        this.joinDate = new Date();
    }

}
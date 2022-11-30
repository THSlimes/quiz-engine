// library imports
import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';

import { ServerConfig } from '../config';
import Client from './Client';

export default class GameServer {
    
    // internal servers
    private app:Express|undefined;
    private server:http.Server|undefined;
    private io:Server|undefined

    // server logic
    private readonly config:ServerConfig;
    private _running = false;
    public get running() { return this._running; }
    private startDate:Date|undefined;

    private readonly clients:Array<Client> = [];

    public constructor(config:ServerConfig) {
        this.config = config;
    }

    /**
     * Starts hosting the game & socket.io server.
     */
    public start() {
        if (!this.running) {
            this.app = express(); // create express webapp
            this.server = http.createServer(this.app); // create HTTP server for webapp
            this.io = new Server(this.server); // create socket.io server

            this.app.use('/', express.static(this.config.dir));

            this.io.on('connection', this.onConnect.bind(this));

            this.server = this.server.listen(this.config.port, () => {
                console.log(`Started server on localhost:${this.config.port}`);
            });

            this._running = true;
            this.startDate = new Date();
        }
        else throw new Error('Server already running.');
    }

    /**
     * Shuts down the game & socket.io server.
     */
    public stop() {
        if (this.running) {
            this.io?.close(); // close first
            this.io = undefined;
            this.server?.close(); // close first
            this.server = undefined;
            this.app = undefined;

            this._running = false;
            this.startDate = undefined;
            console.log('Stopped server');
        }
        else throw new Error('Server is not running.');
    }

    private onConnect(socket:Socket) {
        const client = new Client(socket);

        this.clients.push(client);
        console.log(`Client ${client.id} joined. (${this.clients.length} total)`);

        socket.on('disconnect', reason => this.onDisconnect.bind(this)(client,reason));
    }

    private onDisconnect(client:Client, reason:string) {
        for (let i = 0; i < this.clients.length; i ++) {
            if (this.clients[i] === client) {
                this.clients.splice(i,1);
                break; // client only occurs once
            }
        }

        console.log(`Client ${client.id} disconnected: ${reason}. (${this.clients.length} left)`);
    }

}
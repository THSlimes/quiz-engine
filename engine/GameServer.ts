// Library imports
import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

import { ServerConfig } from '../config';

export default class GameServer {

    private readonly config:ServerConfig;
    private _running = false;
    public get running() { return this._running; }

    private app:Express|undefined;
    private server:http.Server|undefined;
    private io:Server|undefined

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

            this.server = this.server.listen(this.config.port, () => {
                console.log(`Started server on localhost:${this.config.port}`);
            });

            this._running = true;
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
            console.log('Stopped server');
        }
        else throw new Error('Server is not running.');
    }

}
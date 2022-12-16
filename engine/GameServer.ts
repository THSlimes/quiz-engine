// library imports
import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';

import * as crypto from 'crypto';

import { ServerConfig } from '../config';
import Client from './Client';
import Hub from './game/client-types/Hub';
import Player from './game/client-types/Player';
import Game from './game/Game';
import Gamemode from './game/gamemodes/GameMode';

export default class GameServer {
    
    // internal servers
    private app:Express|undefined;
    private server:http.Server|undefined;
    private io:Server|undefined

    // server logic
    private readonly config:ServerConfig;
    private _running = false;
    public get running() { return this._running; }
    private startDate:Date|undefined; // Date this server was started on (undefined when inactive)

    private readonly clients:Array<Client> = [];
    
    // game logic
    private static readonly ID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    private static readonly ID_LENGTH = 4;

    private games:GameLibrary = {};

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

    /**
     * This method is run whenever a new Socket connection
     * is established.
     * @param socket Socket that disconnected
     */
    private onConnect(socket:Socket) {
        const client = new Client(socket);
        socket.on('disconnect', (reason) => this.onDisconnect(client, reason));

        this.clients.push(client);
        console.log(`Client ${client.id} joined. (${this.clients.length} total)`);

        socket.on('join game', (id, role) => {
            if (id in this.games) { // valid id
                const game = this.games[id];

                if (game.players.length >= game.gamemode.settings.maxPlayers) socket.emit('show error message','That Game is full.');
                else if (role === 'player') game.connect(new Player(socket, game));
                else if (role === 'hub') game.connect(new Hub(socket, game));
                else console.log(`Client ${client.id} tried to use non-existent role ${role}.`);
            }
            else { // invalid id
                console.log(`Client ${client.id} tried to join non-existent game ${id}.`);
                socket.emit('show error message', 'Game could not be found.');
            }
        });

    }

    /**
     * This method is run when a Client disconnects.
     * @param client Client that disconnected
     * @param reason reason for disconnecting
     */
    private onDisconnect(client:Client, reason:string) {
        for (let i = 0; i < this.clients.length; i ++) {
            if (this.clients[i] === client) {
                this.clients.splice(i,1);
                break; // client only occurs once
            }
        }

        console.log(`Client ${client.id} disconnected: ${reason}. (${this.clients.length} left)`);
    }

    /**
     * Creates and registers a new Game on this GameServer.
     * @param gamemode Gamemode the Game uses
     * @returns 
     */
    public createGame(gamemode:Gamemode):string {
        // generate id
        let id;
        do {
            id = '';
            while (id.length < GameServer.ID_LENGTH) {
                id += GameServer.ID_CHARS[crypto.randomInt(GameServer.ID_CHARS.length)];
            }
        } while (id in this.games);

        // create Game
        this.games[id] = new Game(id, gamemode);

        return id;
    }

}

/**
 * A GameLibrary maps game codes/ids to the Game objects.
 */
interface GameLibrary {
    [key: string]: Game
}
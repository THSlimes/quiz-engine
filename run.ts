import { CONFIG } from './config';

import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/',express.static(__dirname+CONFIG.serverConfig.dir));

server.listen(CONFIG.serverConfig.port, () => {
    console.log(`Started webserver on port ${CONFIG.serverConfig.port}.`);
});

io.on('connection', socket => {
    console.log('A client connected.');
});
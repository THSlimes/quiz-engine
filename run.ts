import { CONFIG } from './config';

import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

import Screen from './engine/ui/Screen';
import ParagraphUIComponent from './engine/ui/components/ParagraphUIComponent';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/',express.static(__dirname+CONFIG.serverConfig.dir));

io.on('connection', socket => {
    console.log(socket.id + ' connected');
    socket.emit('render screen', screen);
});

server.listen(3000, () => {
    console.log('Listening on *:3000');
    
});

const screen = new Screen(
    'test screen',
    [
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
        new ParagraphUIComponent('test'),
    ]
);
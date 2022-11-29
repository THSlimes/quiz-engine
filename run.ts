import { CONFIG } from './config';

import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

import Screen from './engine/ui/Screen';
import ParagraphUIComponent from './engine/ui/components/ParagraphUIComponent';
import HeaderUIComponent from './engine/ui/components/HeaderUIComponent';
import ImageUIComponent from './engine/ui/components/ImageUIComponent';
import TextInputUIComponent from './engine/ui/components/inputs/TextInputUIComponent';

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
        new HeaderUIComponent('Header H1',1),
        new HeaderUIComponent('Header H2',2),
        new ParagraphUIComponent('Paragraph'),
        new ImageUIComponent('/images/placeholder.png','Alt text'),
        new TextInputUIComponent('text', 'placeholder', 'value')
    ]
);
import { CONFIG } from './config';

import express, {Express, Request, Response} from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

import Screen from './engine/ui/Screen';
import ParagraphUIComponent from './engine/ui/components/ParagraphUIComponent';
import HeaderUIComponent from './engine/ui/components/HeaderUIComponent';
import ImageUIComponent from './engine/ui/components/ImageUIComponent';
import TextInputUIComponent from './engine/ui/components/inputs/TextInputUIComponent';
import ToggleButtonUIComponent from './engine/ui/components/inputs/ToggleButtonUIComponent';
import NumberInputUIComponent from './engine/ui/components/inputs/NumberInputUIComponent';
import NextScreenButtonUIComponent from './engine/ui/components/inputs/NextScreenButtonUIComponent';
import MultiSelectUIComponent from './engine/ui/components/inputs/MultiSelectUIComponent';

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
        new TextInputUIComponent('text', 'placeholder', 'value'),
        new ToggleButtonUIComponent('toggle button', 'toggle button',false),
        new NumberInputUIComponent('number', 0, undefined, 3.14),
        new NextScreenButtonUIComponent('nextScreen1','next screen',true,false)
    ],
    new Screen(
        'test screen 2',
        [
            new HeaderUIComponent('test screen 2'),
            new MultiSelectUIComponent('multiselect',['option 1','option 2','option 3','option 4'],undefined,0,2),
            new NextScreenButtonUIComponent('nextScreen1','next screen',true,false)
        ]
    )
);
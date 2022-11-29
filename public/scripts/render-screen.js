import './lib/jquery.js';
import { socket } from './socket-io-connect.js';

socket.on('render screen', renderScreen);

export var currentScreen = undefined;
function renderScreen(screen) {
    console.log('Rendering screen: ' + screen.name);
    
    const screenDiv = $('div#screen');
    screenDiv.children().remove();
    for (let i = 0; i < screen.components.length; i ++) {
        screenDiv.append(screen.components[i].html);
    }
    
    this.currentScreen = screen;
}
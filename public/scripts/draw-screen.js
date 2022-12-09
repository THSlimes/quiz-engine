import './lib/jquery.js';
import socket from './socket-io-connect.js';
import { allAnswered } from './collect-answers.js';

socket.on('draw screen', renderScreen);

export var currentScreen = undefined;
export function renderScreen(screen) {
    if (screen === undefined) $('#login').fadeIn();
    else $('#login').fadeOut();

    console.log('Drawing screen: ' + screen.name);
    
    const screenDiv = $('div#screen');
    screenDiv.children().remove();
    for (let i = 0; i < screen.components.length; i ++) {
        screenDiv.append(screen.components[i].html);
    }
    
    currentScreen = screen;

    // enabling next screen buttons
    if (allAnswered()) $('.ui-next-screen-button').removeAttr('disabled');
    else $('.ui-next-screen-button').attr('disabled',true);
}
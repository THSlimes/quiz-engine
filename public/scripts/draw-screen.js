import './lib/jquery.js';
import socket from './socket-io-connect.js';
import { allAnswered } from './collect-answers.js';

socket.on('draw screen', drawScreen);

export var currentScreen = undefined;
export function drawScreen(screen) {
    if (screen === undefined) $('#login').fadeIn();
    else $('#login').fadeOut();

    console.log('Drawing new screen');
    console.log(screen);
    
    const screenContainer = $('div#screen-container');
    screenContainer.children().remove();
    screenContainer.append(screen);

    currentScreen = screen;

    // enabling next screen buttons
    if (allAnswered()) $('.ui-next-screen-button').removeAttr('disabled');
    else $('.ui-next-screen-button').attr('disabled',true);
}
import './lib/jquery.js';
import socket from './socket-io-connect.js';
import { allAnswered, answer } from './collect-answers.js';

socket.on('draw screen', drawScreen);

export var currentScreen = undefined;
export function drawScreen(screen) {
    console.log('Drawing new screen');

    if (screen === undefined) $('#login').fadeIn();
    else {
        $('#login').fadeOut();
   
        if (screen.clearAnswer) for (const key in answer) delete answer[key]; // reset answer

        const screenContainer = $('div#screen-container');
        screenContainer.children().remove();
        screenContainer.append(screen.html);

        currentScreen = screen;

        // enabling next screen buttons
        if (allAnswered()) $('.ui-next-screen-button').removeAttr('disabled');
        else $('.ui-next-screen-button').attr('disabled',true);
    }
}
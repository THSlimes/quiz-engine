import './lib/jquery.js';
import { socket } from './socket-io-connect.js';

socket.on('show error message', showErrorMessage);

function showErrorMessage(msg) {
    $('.ui-error-message').stop(true, true).text(msg).slideDown();
    $('.ui-error-message').delay(3000).slideUp();
}
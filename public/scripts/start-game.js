import socket from './socket-io-connect.js';

/**
 * Asks the server to start the Game.
 */
window.startGame = function() {
    socket.emit('start game');
}
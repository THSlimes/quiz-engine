import './lib/jquery.js';
import socket from './socket-io-connect.js';

/**
 * Makes the Client join a Game.
 * @param {string} id 
 */
window.joinGame = function(id) {
    id = id.trim();
    if (id.length > 0) {
        socket.emit('join game', id, document.getElementById('join-as-hub').checked ? 'hub' : 'player');
    }
}
import { answer } from "./collect-answers.js";
import socket from "./socket-io-connect.js";

window.submitAnswer = function() {
    socket.emit('answer', answer);
}
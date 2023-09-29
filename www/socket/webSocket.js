const socketio = require("socket.io");
const socketController = require("../../src/controller/socketController");

let startSocket = (server) => {
    let io = socketio(server,{
        cors: {
          origin: 'http://localhost:3000',
        }
      });
    
    socketController.setNSP(io);
}

module.exports = {
    startSocket:startSocket
}

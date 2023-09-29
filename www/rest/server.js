const http = require('http');
const ws = require('../socket/webSocket')

let startServer = (app) =>{
    const server = http.createServer(app);
    server.listen(process.env.PORT);
    server.on('listening', ()=>{
        console.log(`The server is running at port ${process.env.PORT}`);
        ws.startSocket(server);
    })
    server.on('error', ()=>{
        console.log('Unable to connect with Server', error);
    })
}

module.exports= {
    startServer:startServer
}


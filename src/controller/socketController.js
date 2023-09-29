const newSocket = require('../../database/selectSocket');
const newRoom = require('../../database/selectRoom');
const selectRoom = require('../../database/selectSocketRoom')
const newMessage = require('../../database/addMessage');
const getMessage = require('../../database/selectMessage');
const status = require('../../database/updateStatus');
const selectStatus = require('../../database/selectSocketStatus');
const response = require('../libs/responseLibs');


const setNSP = (io) => {
    io.on('connection', async (socket) => {
        console.log(`One socket connected : ${socket.id}`);
        // let socketData={
        //     id: socket.id,
        //     status: 'online'
        // }
        // let response = await status.updateStatus(socketData);

        socket.on('login-socket', async (data) => {
            try {
                console.log('login-socket ===> ', data);
                // io.to().emit('privatemsg',data);
                const user = await newSocket.selectSocket(data, socket.id);
                socket.emit('login', response.generate(false, 'Socket Connected', user));
            } catch (error) {
                console.log(error);
                socket.emit('loginError', response.generate(true, 'Socket doesnot Connected', user));
            }
        })

        socket.on('conversation', async (data) => {
            try {
                console.log('conversation-socket ===> ', data);
                const room = await newRoom.selectRoom(data);
                // socket.emit('conversation', response.generate(false, 'Conversation found', room));
                console.log(room);
                if (room[1] === 1) {
                    let roomId = await newRoom.selectRoom(data);
                    socket.join(roomId[0].room_id);
                    socket.emit('conversation', response.generate(false, 'Room Joined', roomId));
                    console.log(`${socket.id} joined room: ${roomId[0].room_id}`);
                    // socket.on('joinRoom', (roomId) => {
                    //     socket.join(roomId);
                    //     console.log(`Socket ${socket.id} joined room ${roomId}`);
                } else {
                    let roomId = room[0].room_id;
                    socket.emit('conversation', response.generate(false, 'Room Joined', roomId));
                    console.log(`${socket.id} joined room: ${roomId}`);
                }

            } catch (error) {
                console.log(error);
                socket.emit('conversation', response.generate(true, 'Conversation doesnot found', error.message));
            }
        })

        socket.on('send-message', async (data) => {
            console.log('message-socket ===> ', data);
            let { value } = data;
            let roomId = await selectRoom.selectSocketRoom(data);
            try {
                let message = await newMessage.addMessage(data, roomId[0].room_id);
                if (message[1] === 1) {
                        socket.to(roomId[0].room_id).emit('receive-message', response.generate(true, 'new Message', value));
                        socket.emit('message-achknowlege',response.generate(true, 'new Message', value));
                        let allMessage = await getMessage.getMessage(data);
                        socket.emit('get-message', response.generate(true, 'all Message', allMessage));
                    } else{
                        socket.emit('message-achknowlege', value);
                    }

                    socket.on('message', (data)=>{
                        console.log(data);
                    })
                } catch (error) {
                console.log(error.message);
            }


        })

        socket.on('get-message', async (data) => {
            console.log('get-message-socket ===> ', data);
            // let { conversationId } = data;
            try {
                    let allMessage = await getMessage.getMessage(data);
                    socket.emit('get-message', response.generate(true, 'all Message', allMessage));

                } catch (error) {
                console.log(error.message);
            }


        })

        socket.on('socket-status', async(data)=>{
            console.log('data from status ===>', data);
            try{
                let selectstatus = await selectStatus.selectSocketStatus(data);
                console.log(selectstatus);
                socket.emit('selectstatus', response.generate(true,'status', selectstatus));
            }
            catch(e){
                console.log(e.message);
            }
        })

        socket.on('disconnect', async() => {
            console.log(`One socket disconnected : ${socket.id}`);
            let socketData={
                id: socket.id,
                status: 'online'
            }
            let response = await status.updateStatus(socketData);


        })
    })
}


module.exports = {
    setNSP: setNSP
}
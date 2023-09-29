const addRoom = require('./addSocketroom')
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const selectRoom = async (data) => {

    let room = await sequelize.query(`SELECT * FROM socket_rooms WHERE conversation_id = '${data.conversationId}'`, { type: QueryTypes.SELECT });
            try{
            if (room.length <= 0) {
                let roomExist = await addRoom.addSocketroom(data);
                return new Promise((resolve, reject) => {
                    resolve(roomExist);
                });
            } else{
                    return new Promise((resolve,reject) => {
                        resolve(room);
                    });
            } 
        }catch(error) {
            console.log(error.message);
        }
    
    }
    
    module.exports={
        selectRoom: selectRoom
    }
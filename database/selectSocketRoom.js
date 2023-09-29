const addRoom = require('./addSocketroom')
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const selectSocketRoom = async (data) => {
    try{
    let room = await sequelize.query(`SELECT room_id FROM socket_rooms WHERE conversation_id = '${data.conversationId}'`, { type: QueryTypes.SELECT });
            return new Promise((resolve,reject) => {
                resolve(room);
            });
        }catch(error) {
            console.log(error.message);
        }
}
    
    module.exports={
        selectSocketRoom: selectSocketRoom
    }
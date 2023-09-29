const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const addSocketroom = async (data) => {
    try {
        let room_id = Math.floor(Math.random() * 1000);
        let save = await sequelize.query(`INSERT INTO socket_rooms(conversation_id, room_id)VALUES ('${data.conversationId}','${room_id}')`, { type: QueryTypes.INSERT });
        return new Promise((resolve, reject) => {
            resolve(save)
        })
    }
    catch (error) {
        console.log("error:", error)
    }
}

module.exports={
    addSocketroom: addSocketroom
}
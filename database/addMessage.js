const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('WhatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const addMessage = async (data, room) => {
    try {
        let newMessage = await sequelize.query(`INSERT INTO messages(sender_email, receiver_email, conversations_id, room_id, type, value) VALUES ('${data.senderEmail}','${data.receiverEmail}', '${data.conversationId}', '${room}', '${data.type}', '${data.value}')`, { type: QueryTypes.INSERT });
        // if (newMessage[1] === 1) {
        //     // let message = await sequelize.query(`UPDATE conversations SET messages = '${req.body.value}' WHERE conversations_id= '${req.body.conversationsId}'`, { type: QueryTypes.UPDATE });
        //     return new Promise((resolve, reject) => {
        //         resolve(message);
        //     })
        // } else {
            return new Promise((resolve, reject) => {
            resolve(newMessage);
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    addMessage: addMessage
}

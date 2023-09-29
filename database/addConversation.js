const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const startChat = async (req, res) => {
    try {
        let chatting = await sequelize.query(`INSERT INTO conversations(sender_email, receiver_email)VALUES ('${req.body.senderEmail}','${req.body.receiverEmail}')`, { type: QueryTypes.INSERT });
        return new Promise((resolve, reject) => {
            resolve(chatting);
        })
    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports={
    startChat: startChat
}
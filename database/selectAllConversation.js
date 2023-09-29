const addConversation = require('./addConversation')
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const selectAllConversation = async (req, res) => {
    try {

        let chat = await sequelize.query(`SELECT * FROM conversations WHERE (sender_email='${req.query.sender_email}' AND receiver_email='${req.query.receiver_email}') OR (sender_email='${req.query.receiver_email}' AND receiver_email='${req.query.sender_email}')`, { type: QueryTypes.SELECT });
        return new Promise((resolve, reject) => {
            resolve(chat);
        })
    }
    catch (error) {
        console.log("error:", error);
    }
}

module.exports = {
    selectAllConversation: selectAllConversation
}
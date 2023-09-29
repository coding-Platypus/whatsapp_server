const addConversation = require('./addConversation')
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const conversation = async (req, res) => {
    try {

        let chat = await sequelize.query(`SELECT * FROM conversations WHERE (sender_email='${req.query.sender_email}' AND receiver_email='${req.query.receiver_email}') OR (sender_email='${req.query.receiver_email}' AND receiver_email='${req.query.sender_email}')`, { type: QueryTypes.SELECT });
        
        if (chat.length <= 0) {
            // chatting = await sequelize.query(`INSERT INTO conversations(sender_email, receiver_email, messages)VALUES ('${req.body.senderEmail}','${req.body.receiverEmail}','${req.body.messages}')`, { type: QueryTypes.INSERT });
            // return new Promise((resolve, reject) => {
            //     resolve(chatting);

            // })
            let chatting = await addConversation.startChat(req,res);
            return new Promise((resolve, reject) => {
                resolve(chatting);
            });
        } else{
                return new Promise((resolve,reject) => {
                    resolve(chat);
                });
        }
        
    
    } catch (error) {
        console.log("error:", error);
    }

}

module.exports = {
    conversation: conversation
}
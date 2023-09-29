//const message = require('./setMessage');
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const getMessage = async (data) => {
    try {

        let account = await sequelize.query(`SELECT * FROM messages WHERE conversations_id='${data.conversationId}'`, { type: QueryTypes.SELECT });
        // if (account.length > 0) {
        //     let message = await sequelize.query(`UPDATE conversations SET messages = '${req.body.messages}' WHERE conversations_id= '${account[0].conversations_id}'`, { type: QueryTypes.UPDATE });
        //     return new Promise((resolve, reject) => {
        //         resolve(message);
        //     })
        // } else {
        //     return new Promise((resolve, reject) => {
        //         resolve(account);
        //     });
            return new Promise((resolve, reject) => {
                    resolve(account);
            });
        }
     catch (error) {
        console.log("error:", error);
    }

}

module.exports = {
    getMessage: getMessage
}

const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('WhatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const updateSocket = async (data, socket) => {
    let updateId = await sequelize.query(`UPDATE socket SET socket_id = '${socket}' WHERE user_id='${data.user_id}' AND status='${data.status}'`, { type: QueryTypes.UPDATE });
        if(updateId[1] === 1){
            return new Promise((resolve, reject) => {
                resolve(updateId);
            })
        }else{
        return new Promise((resolve, reject) => {
            resolve('Not updated');
        })
}
}

module.exports = {
    updateSocket: updateSocket
}
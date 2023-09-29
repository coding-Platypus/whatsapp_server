const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('WhatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const updateStatus = async (socket) => {
    let updateId = await sequelize.query(`UPDATE socket SET status = '${socket.status}' WHERE socket_id='${socket.id}'`, { type: QueryTypes.UPDATE });
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
    updateStatus: updateStatus
}
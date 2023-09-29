const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const addSocket = async (data, socket) => {
    try {

        let save = await sequelize.query(`INSERT INTO socket(socket_id, user_id, status)VALUES ('${socket}','${data.user_id}','${data.status}')`, { type: QueryTypes.INSERT });
        return new Promise((resolve, reject) => {
            resolve(save)
        })
    }
    catch (error) {
        console.log("error:", error)
    }
}

module.exports={
    addSocket: addSocket
}
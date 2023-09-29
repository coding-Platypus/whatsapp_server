const addUser = require('./addSocket');
const updateUser = require('./updateSocket');
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const selectSocket = async (data, socket) => {

let user = await sequelize.query(`SELECT * FROM socket WHERE user_id = '${data.user_id}'`, { type: QueryTypes.SELECT });
        try{
        if (user.length <= 0) {
            let userExist = await addUser.addSocket(data, socket);
            return new Promise((resolve, reject) => {
                resolve(userExist);
            });
        } else{
                let userExist = await updateUser.updateSocket(data, socket)
                return new Promise((resolve,reject) => {
                    resolve(userExist);
                });
        }
    } catch(error) {
        console.log(error.message);
    }

}

module.exports={
    selectSocket: selectSocket
}
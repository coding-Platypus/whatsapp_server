const addUser = require('./addSocket');
const updateUser = require('./updateSocket');
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const selectSocketStatus = async (data) => {
    try{
    let user = await sequelize.query(`SELECT * FROM socket WHERE user_id = '${data.user_id}'`, { type: QueryTypes.SELECT });
            return new Promise((resolve, reject) => {
                resolve(user);
            });
        }  catch(error) {
        console.log(error.message);
    }

}

module.exports={
    selectSocketStatus: selectSocketStatus
}
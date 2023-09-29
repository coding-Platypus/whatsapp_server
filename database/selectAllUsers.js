const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const selectAllUsers = async(req,res) => {
    try{
        let allUsers = await sequelize.query(`SELECT * FROM users`, { type: QueryTypes.SELECT });
        return new Promise((resolve, reject) => {
            resolve(allUsers);
        })
    }
    catch (error) {
        console.log("error:", error)
    }
}

module.exports = {
    selectAllUsers: selectAllUsers
}
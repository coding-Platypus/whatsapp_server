const security = require('../security/hash');
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const addUser = async (req, res) => {

    try {
        let password = await security.hash(req.body.password);

        let save = await sequelize.query(`INSERT INTO users(name, email, phone, user_name, password)VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.user}', '${password}')`, { type: QueryTypes.INSERT });
        return new Promise((resolve, reject) => {
            resolve(save)
        })
    }
    catch (error) {
        console.log("error:", error)
    }

}


module.exports = {
    addUser: addUser
}
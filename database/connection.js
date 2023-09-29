const {QueryTypes, Sequelize} = require('sequelize');
const sequelize = new Sequelize('WhatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

let connection = async(app) => {
    try {
        await sequelize.authenticate();
        require('../www/rest/server').startServer(app);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports={
    connection: connection,
}
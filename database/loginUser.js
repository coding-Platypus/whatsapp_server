const security = require('../security/hash');
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const login= async(req,res) =>{
    try {
        let search = await sequelize.query(`SELECT * FROM users WHERE user_name = '${req.query.name}' AND email='${req.query.email}'`, { type: QueryTypes.SELECT });
        if(search.length > 0){
            let verify = await security.verify(req.body.password, search[0].password);
            let password = await security.hash(req.body.password);
            console.log(verify);
            
            if(verify === true){
                return new Promise((resolve, reject) => {
                    resolve(search);
            })
        }
            else{
                return new Promise((resolve, reject) => {
                    resolve(verify);
            })
        }
        }else{
            return new Promise((resolve, reject) => {
                resolve(search);
            })
        }
    } catch(error){
        console.log(error.message);
    }
}

module.exports = {
    login: login
}
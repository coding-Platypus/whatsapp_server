const user = require('./addUser')
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


const selectUser = async (req, res) => {
    try {

        let search = await sequelize.query(`SELECT * FROM users WHERE email='${req.query.email}'`, { type: QueryTypes.SELECT });
        if (search.length <= 0) {
            // let save = await sequelize.query(`INSERT INTO user(iss, nbf, aud, sub, email, email_verified, azp, name, picture, given_name, family_name, iat, exp, jti)VALUES ('${req.body.iss}','${req.body.nbf}','${req.body.aud}','${req.body.sub}','${req.body.email}', '${req.body.email_verified}', '${req.body.azp}', '${req.body.name}', '${req.body.picture}', '${req.body.given_name}', '${req.body.family_name}', '${req.body.iat}', '${req.body.exp}', '${req.body.jti}')`, { type: QueryTypes.INSERT });
            // return new Promise((resolve, reject) => {
            //     resolve({
            //         error: 'false',
            //         message: 'Account Successfully Inserted..'
            //     })

            // })
            let save = await user.addUser(req, res);
            return new Promise((resolve, reject) => {
                resolve(save);
            })
        }else{
            return new Promise((resolve,reject) => {
                resolve(search);
            })
        }
    } catch (error) {
        console.log("error:", error)
    }
}

module.exports = {
    selectUser: selectUser
}
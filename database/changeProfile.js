const path = require('path');
const fs = require('fs');

const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const changeProfile = async (req, res) => {
    try {
        //const originalExtension = path.extname(req.file.originalname);
        const newFilename = `${req.file.filename}`;
        const newpath = path.join(req.file.destination, newFilename);
        console.log('full path', newpath);
        fs.rename(req.file.path, newpath, (err) => {
            if(err) {
                res.status(200).send('error')
            }
        })
        let uploadPicture = await sequelize.query(`UPDATE users SET profile_image = '${newFilename}' WHERE user_id='${req.query.id}'`, { type: QueryTypes.UPDATE });
        if(uploadPicture[1] === 1){
            let picture = await sequelize.query(`SELECT profile_image from users WHERE user_id='${req.query.id}'`, { type: QueryTypes.SELECT });
            return new Promise((resolve, reject) => {
                resolve(picture);
            })
        }else{
        return new Promise((resolve, reject) => {
            resolve(uploadPicture);
        })
    }
    }
    catch(error) {
        console.log(error.message);
    }
}

module.exports = {
    changeProfile: changeProfile
}
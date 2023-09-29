const path = require('path');
const fs = require('fs');

const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('whatsApp_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const sendFiles = async(req,res) => {
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
    let fileMessage = await sequelize.query(`INSERT INTO messages(sender_email, receiver_email, conversations_id, type, value) VALUES ('${req.body.senderEmail}','${req.body.receiverEmail}', '${req.body.conversationId}', '${req.body.type}', '${newFilename}')`, { type: QueryTypes.INSERT });
    return new Promise((resolve, reject) => {
        resolve(fileMessage);
    });
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports={
    sendFiles: sendFiles
}
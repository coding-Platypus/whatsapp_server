let response = require('../libs/responseLibs');
let send = require('../../database/sendFiles');

const fileController = async(req, res) =>{
    try{
        const message = await send.sendFiles(req,res);
            if (message[1] === 1) {
                res.status(200).send(response.generate(false, 'Files Send', message));
            }
            else {
                res.status(201).send(response.generate(false, 'File doesnot send', message));
            }
        }catch(error){
        console.log(error.message);
    }
}

module.exports= {
    fileController: fileController
}




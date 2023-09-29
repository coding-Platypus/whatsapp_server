let response = require('../libs/responseLibs');
const messageControl = require('../../database/addMessage');
const getAllMessage = require('../../database/selectMessage');

const sendMessage = async(req, res) =>{
    try{
        const message = await messageControl.addMessage(req,res);
            if (message[1] === 1) {
                res.status(200).send(response.generate(false, 'Message sent', message));
            }
            else {
                res.status(201).send(response.generate(false, 'Message doesnot send', message));
            }
        }catch(error){
        console.log(error.message);
    }
}

const getMessages = async(req,res) => {
    try{
        const getMsg = await getAllMessage.getMessage(req, res);
        getMsg.map((msg) => {
            const myArray = msg.value.split(".");
            if(myArray[1]){
                msg.ext= myArray[1];
            } else {
                msg.ext = null;
            }
        })
        if(getMsg.length > 0){
            res.status(200).send(response.generate(false, 'Messages Found', getMsg));
        } else{
            res.status(201).send(response.generate(false, 'Message doesnot found', []));
        }
    }catch(error){
        console.log(error.message);
    }
}

module.exports={
    sendMessage: sendMessage,
    getMessages: getMessages
}
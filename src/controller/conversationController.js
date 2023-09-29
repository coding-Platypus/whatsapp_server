let response = require('../libs/responseLibs');
const conversationControl = require('../../database/selectConversation');
const selectConversation = require('../../database/selectAllConversation');

const startConversation = async (req, res) => {
    try {
        const start = await conversationControl.conversation(req, res);
        if (start[1] === 1) {
            res.status(200).send(response.generate(false, 'Happy Chatting', start));
        }
        else {
            res.status(201).send(response.generate(false, 'They already have a chat', start));
        }
    } catch (error) {
        res.status(500).send(response.generate(true, error.message, null));
    }
}

const getConversations = async(req,res) => {
    try{
        const message = await selectConversation.selectAllConversation(req,res);
        console.log(message);
        if(message.length > 0) {
            res.status(200).send(response.generate(false, 'Conversation found', message));
        }else{
            res.status(201).send(response.generate(true, 'Conversation doesnot found', message));
        }
    } catch(error){
        console.log(error.message);
    }
}
module.exports = {
    startConversation: startConversation,
    getConversations: getConversations
}
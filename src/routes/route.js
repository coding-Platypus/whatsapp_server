const userController = require('../controller/userController');
const conversationController = require('../controller/conversationController');
const messageController = require('../controller/messageController');
const jwt = require('../libs/tokenLib');
// const multer = require('multer');
let fileUpload = require('../libs/multerLibs');
let imageController = require('../controller/fileController')



let setRouter = (app) => {
    app.post('/selectUser', userController.addUser);
    app.post('/loginUser', userController.loginUser);

    app.put('/picture' , fileUpload.upload.single('image'), userController.changeProfile);
    app.get('/users', jwt.verifyClaimWithoutSecret,userController.getUsers);
    app.post('/conversation', conversationController.startConversation);
    app.get('/getconversation', conversationController.getConversations);
    app.post('/messages/add', messageController.sendMessage)
    app.get('/messages', messageController.getMessages);
    app.post('/messages/files', fileUpload.upload.single('file'), imageController.fileController);

    
}

module.exports = {
    setRouter: setRouter
}
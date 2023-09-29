const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  },
});



  const upload = multer({ storage: storage, 
    limits: {
    fileSize: 1291432781,
  }, });

  module.exports = {
    upload:upload
  }
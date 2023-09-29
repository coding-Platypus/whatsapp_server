const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sessionExpTime = process.env.SESSIONEND;
const secretKey = process.env.ENC_KEY;
const response = require('./responseLibs');
const user = require('../controller/userController')

let generateToken = (data) => {
    return new Promise((resolve,reject)=>{
      try{
        let claims = {
          jwtid: uuidv4(),
          iat: Date.now(),
          exp: Math.floor(Date.now()/1000) + eval(sessionExpTime),
          sub: 'auth_token',
          data: data
        }
        resolve(jwt.sign(claims, secretKey));
      }catch(err){
        reject(err);
      }
    });
  }
  let verifyClaim = (token,secret,cb) => {
    // verify a token symmetric
    jwt.verify(token, secret, function (err, decoded) {
      if(err){
        cb(err,null)
      }
      else{
        cb(null,decoded);
      }
     });
  }// end verify claim 
  
  let verifyClaimWithoutSecret = (req,res,next) => {
      let token = req.header('token');
      jwt.verify(token, secretKey, function (err, decoded) {
        if(err){
          res.status(203).send(response.generate(true, 'Token expired', err));
          console.log(err);
        }else{
          console.log(decoded);
          next();
        }
      });
    }

  module.exports = {
    generateToken: generateToken,
    verifyToken :verifyClaim,
    verifyClaimWithoutSecret :verifyClaimWithoutSecret
  }
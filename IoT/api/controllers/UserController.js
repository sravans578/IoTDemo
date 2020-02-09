/* eslint-disable no-unused-vars */
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 */


const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
module.exports = {

  router: function(req, res){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader!== 'undefined') {
      //Split at the space
      const bearer = bearerHeader.split(' ');
      //Get token from array
      const bearerToken = bearer[1];
      //Set the token
      req.token = bearerToken;    
      //jwt verification
      console.log('reached here');
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.json({
            message: 'Token expired',
          });
        } else {
          res.json({
            message: 'success',
            authData
          });
        }
      });
    } else {
      //Forbidden
      return res.json({
        message: 'Token missing',
      });
    }
  },

  verifyToken: function(req, res, next){
    //Get auth header value
  },


  //userlogin
  login: function(req, res){
    console.log('Entered login');
    console.log(req.body);
    console.log(req.body.password);
    var HP= bcrypt.hashSync(req.body.password, saltRounds);
    console.log(HP);
    //bicrypt
    User.find({
      'username': req.body.username,
      // "password": HashedPassword,
    }).exec((err, result) => {
      if (err) {
        console.log('here 1');
        sails.log.debug('Some error occurred ' + err);
        return res.ok({
          error: 'Some error occurred'
        }, 300);

      } else {
        console.log(result);
        // eslint-disable-next-line eqeqeq
        if (result != '') {
          console.log('here');
          if(bcrypt.compareSync(req.body.password, result[0].password)) {               
            return res.ok({
              success: 'Login Successful'
            });
          }
          //sails.log.debug('Success', JSON.stringify(result));

        } else {
          console.log('fail');
          return res.ok({
            error: ' Please check the username and password'
          }, 400);
        }
      }
    });
  },

  registration: function(req, res) {
    console.log(req.body.password);
    console.log(req.body.devicegw);
    var hashedPassword;
    var hashedGW;

    // Hashing password and Gateway
    hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    hashedGW = bcrypt.hashSync(req.body.devicegw, saltRounds);
    console.log(HashedPassword);

    // User registraing with credentials
    User.create({//bicrypt
      'deviceid': req.body.deviceid,
      'username': req.body.username,
      'password': hashedPassword,
      'devicegw': hashedGW,
    }).exec((err) => {
      if (err) {
        return res.send({
          success: 'Registration Failed, server error'
        });
      } else {
        // On registration success, send an random 4 digit OTP to IoT server. 
        // OTp genratioon

        var otpf = Math.random()*10000;
        var otp = Math.floor(otpf);
        var request = require('request');
        // Make a post HTTP request to IOT device gateway
        //await()
        request.post({url:req.body.devicegw,form: {OTP:otp}}, function responseFromIoT(err, httpResponse, body) {
          if (err) {
            return console.error('Request failed,try again:', err);
          }
          console.log('Response from IoT', body);
          //await()
          // Check if OTP sent by IOT is same as generated OTP

          if(body.OTP=otp){
            return res.ok({
              success: 'Registration Successful'
            });
          } else {
            return res.ok({
              success: 'Registration Failed'
            });
          }
        });

      }
    });
  },
  //devicelogin
  Devicelogin: function(req, res){
    //bicrypt
    console.log('Inside Device login func');
    console.log(req.body.deviceID);
    console.log(req.body.username);
    console.log(req.body.password);
    User.find({
      'deviceid': req.body.deviceID,
      'username': req.body.username,
    }).exec((err, result) => {
      if (err) {
        sails.log.debug('Some error occurred ' + err);
        return res.ok({
          error: 'Some error occurred'
        }, 300);
      } else {
      // Login Successful
        // eslint-disable-next-line eqeqeq
        if (result != '') {

          console.log('succesful DB search');

          if(bcrypt.compareSync(req.body.password, result[0].password)) {                
            console.log('password macthed');
            const user = {
              id: result[0].deviceid,
              username: result[0].username ,
            };

            jwt.sign({user}, 'secretkey' ,{ expiresIn: '60s'}, (err, token) => {
              if (err) {
                console.log('JWT Signing error');
                return res.JSON({ 
                  message: 'Token invalid',
                });
              } else {
                console.log('Succesful login, send token');
                return res.json({
                  Token: token,
                  message: 'Login Successful'
                });
              }
            });
          }
          // fix this later

          // else {
          //   return res.ok({
          //     error: ' Please check the username and password'
          //   }, 400);
          // }
          console.log(user);
          var gateway = result[0].devicegw;
        }
      }
    });
  } ,

  Getlog: function(req, res){
    console.log(req.body);
    Logger.find({'deviceID': req.body.deviceID}).exec((err, result) => {
      if (err) {
        sails.log.debug('Some error occurred ' + err);
        return res.ok({
          error: 'Some error occurred'
        }, 300);
      } else {
        return res.send({
          success: result
        });
      }
    });
  },
};

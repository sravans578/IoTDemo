/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
module.exports = {

  // $2b$10$MQL51rssKj.dAY33b/uJseA0QirlF13WsXCppMu652/Qnx0t9Coru

  //$2b$10$KCkYFkN5R0FpVwUeKopHQOuwNvRsbkaD1cgsEj.I6R/xrzZw7PcZ2
  //$2b$10$KCkYFkN5R0FpVwUeKopHQOuwNvRsbkaD1cgsEj.I6R/xrzZw7PcZ2


//userlogin
    login: function(req, res){

    console.log(req.body.username);
    console.log(req.body.password);

    var HP= bcrypt.hashSync(req.body.password, saltRounds);
    console.log(HP);

//bicrypt
      User.find({
        
        "username": req.body.username,
        // "password": HashedPassword,
      }).exec(function(err, result) {
        if (err) {
          console.log("here 1");
          sails.log.debug('Some error occurred ' + err);
          return res.ok({
            error: 'Some error occurred'
          }, 300);

        } else {
          console.log(result);
          if (result != "") {
            console.log("here");
            if(bcrypt.compareSync(req.body.password, result[0].password)) {
                 
              return res.ok({
                success: 'Login Successful'
              });
            }
            //sails.log.debug('Success', JSON.stringify(result));
            
          } else {
            console.log("fail");
            return res.ok({
              error: ' Please check the username and password'
            }, 400);
          }
        }
      }); 
    } , 

    registration: function(req, res){

      console.log(req.body.password);
      console.log(req.body.devicegw);
      var HashedPassword;
      var HashedGW;

      // Hashing password and Gateway
      HashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
      HashedGW = bcrypt.hashSync(req.body.devicegw, saltRounds);
      console.log(HashedPassword);
    
    
      // User registraing with credentials
      User.create({//bicrypt
        "deviceid": req.body.deviceid,
        "username": req.body.username,
        "password": HashedPassword,
        "devicegw": HashedGW,
      }).exec(function(err) {
        if (err) {
          return res.send({
            success: 'Registration Failed, server error'
          });
        }
        else
        { // On registration success, send an random 4 digit OTP to IoT server. 
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
                console.log("Response from IoT", body);
                //await()

                // Check if OTP sent by IOT is same as generated OTP

                if(body.OTP=otp){
                  return res.ok({
                       success: 'Registration Successful'
                      //  User.create({//bicrypt
                      //   "deviceid": req.body.deviceid,
                      //   "username": req.body.username,
                      //   "password": HashedPassword,
                      //   "devicegw": HashedGW,
                      // }).exec(function(err) {
                      //   if (err) {
                      //     return res.send({
                      //       success: 'Registration Failed, server error'
                      //     });
                      //   }
                     });
                }
                else{
                  return res.ok({
                    success: 'Registration Failed'
                  });
                }
          });
          // return res.ok({
          //   success: 'Registration Successful'
          // });
        }
      })
   
  },
   //devicelogin  
  Devicelogin: function(req, res){
    //bicrypt
          User.find({
            "deviceid": req.body.deviceID,
            "username": req.body.username,
          }).exec(function(err, result) {
            if (err) {
              sails.log.debug('Some error occurred ' + err);
              return res.ok({
                error: 'Some error occurred'
              }, 300);
    
            } else {
              // Login Successful
              if (result != "") {

                if(bcrypt.compareSync(req.body.password, result[0].password)) {
                 
                  const user = {
                 
                    id: result[0].deviceid,
                    username: result[0].username ,
                   
                  }
                  jwt.sign({user}, 'secretkey' ,{ expiresIn: '30s'}, (err, token) => {
                    res.json({
                        Token: token,
                        message: "Login Successful"
                    });
                });
                  // return res.ok({
                  //   success: 'Login Successful',
                  //   USER: user,
                  // });
                }

                else {
                  return res.ok({
                    error: ' Please check the username and password'
                  }, 400);
                }
                //console.log(result);
                //console.log(result[0].devicegw);
                // Auth token payload
                
                console.log(user);
                var gateway = result[0].devicegw;
              
              } 
            }
          }); 
        } , 

        Getlog: function(req, res){
          
                Logger.find().exec(function(err, result) {
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
              } , 
              
    
     

  

  
};
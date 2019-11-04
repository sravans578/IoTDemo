/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
//userlogin
    login: function(req, res){
//bicrypt
      User.find({
        
        "username": req.body.username,
        "password": req.body.password,
      }).exec(function(err, result) {
        if (err) {
          sails.log.debug('Some error occurred ' + err);
          return res.ok({
            error: 'Some error occurred'
          }, 300);

        } else {
          if (result != "") {
            //sails.log.debug('Success', JSON.stringify(result));
            return res.ok({
              success: 'Login Successful'
            });
          } else {
            return res.ok({
              error: ' Please check the username and password'
            }, 400);
          }
        }
      }); 
    } , 

    registration: function(req, res){
      // User registraing with credentials
      User.create({//bicrypt
        "deviceid": req.body.deviceid,
        "username": req.body.username,
        "password": req.body.password,
        "devicegw": req.body.devicegw,
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
            "password": req.body.password,
          }).exec(function(err, result) {
            if (err) {
              sails.log.debug('Some error occurred ' + err);
              return res.ok({
                error: 'Some error occurred'
              }, 300);
    
            } else {
              if (result != "") {
                console.log(result[0].devicegw);
                var gateway = result[0].devicegw;
               

          
          //       //sails.log.debug('Success', JSON.stringify(result));

          //       return res.ok({
          //         success: 'Login Successful'
          //       });
              } else {
                return res.ok({
                  error: ' Please check the username and password'
                }, 400);
              }
            }
          }); 
        } , 

    
     

  

  
};
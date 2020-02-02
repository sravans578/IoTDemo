/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');
var token ='hi';

module.exports = {

  login: function(req, res){

    
    // Device identifiers
    var Device_ID = "test";
    var user_name = "test";
    var pass_word = "test";

    var jsonDataObj = {'deviceID': Device_ID, 'username': user_name, 'password': pass_word};

    request.post( {url:'http://localhost:1337/devicelogin', body: jsonDataObj, json:true}, function optionalCallback(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          } else 
          {token = body.Token};
          console.log("Generated token: " + body.Token);
          console.log(token);
  
    
        }); 
        },
  
    gateway: function(req, res){
        // Device identifiers
        var Device_ID = "i'mtheid";
        var user_name = "sravan";
        var pass_word = "ammu";

        // Send the OTP along with the username and pasword;
        
        var username = req.body.link;
        var otp = req.body.OTP;
        console.log(otp);

        return res.JSON({
            DeviceID :Device_ID,
            username : user_name,
            password : pass_word,
            OTP : otp,
          });
        
              
            } , 
     
       dataGenerator: function(req, res){

        var headers = {
          'authorization': 'Bearer'+ ' ' + token,
         };
          
        request.post({headers: headers, url:'http://localhost:1337/router', formData: "hello"}, function optionalCallback(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          }
          var result = JSON.parse(body);
          if (result.message === 'Token expired') {
            console.log("entered here");
            module.exports.login();
          }
          else
          {console.log("token is owrking")};
          
         
          
        });
        
              
        }, 
      

};


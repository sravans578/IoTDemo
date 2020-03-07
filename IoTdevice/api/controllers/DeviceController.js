/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');
const jwt = require('jsonwebtoken');

//Token to be included in header while making requests
var TOKEN;

// Device identifiers
var DEVICE_ID = 'test';
var USER_NAME = 'test';
var PASSWORD = 'test';

module.exports = {

  login: function(req, res) {

    var jsonDataObj = {'deviceID': DEVICE_ID, 'username': USER_NAME, 'password': PASSWORD};
    request.post( {url:'http://localhost:1337/devicelogin', body: jsonDataObj, json:true}, function optionalCallback(err, httpResponse, body) {

      if (err) {
        return console.error('upload failed:', err);
      } else {
        TOKEN = body.Token;
      }
      console.log('Generated token: ' + body.Token);
      console.log(TOKEN);
    });
  },

  gateway: function(req, res) {
    // Send the OTP along with the username and pasword;
    // var user_name = req.body.link;
    var otp = req.body.OTP;
    console.log(otp);

    return res.JSON({
      DeviceID : DEVICE_ID,
      username : USER_NAME,
      password : PASSWORD,
      OTP : otp,
    });
  } ,

  dataGenerator: function(req, res) {
    let flag = true;
    if (flag === true) {
      var headers = {
        'authorization': 'Bearer'+ ' ' + TOKEN,
      };
      console.log(headers);
      var data = {
        value: 'message',
        destination: '192.168.1.1',
      };
      var encrypted_data = jwt.sign({ data: data }, 'secretkey');
      var jsonDataObj = {'deviceID': DEVICE_ID, data: encrypted_data};
      request.post({headers: headers, url:'http://localhost:1337/router', body: jsonDataObj, json:true}, function optionalCallback(err, httpResponse, body) {
        if (err) {
          console.log('Entered error block');
          return console.error('Error', err);
        }
        // console.log(httpResponse);
        if (httpResponse.body.message === 'Token expired') {
        // Login again in case of Token expiry
          console.log('Token expired -> attempting regeneration');
          module.exports.login();
        } else {
          console.log('token is working');
        }
      });
    } else { console.log('Set flag to true to send requests');}
  },
};


/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    gateway: function(req, res){
        // Device identifiers
        var Device_ID = "i'mtheid";
        var user_name = "sravan";
        var pass_word = "ammu";

        // Send the OTP along with the username and pasword;
        
        var username = req.body.link;
        var otp = req.body.OTP;

        return res.send({
            username : user_name,
            password : pass_word,
            OTP : otp,
          });
        



              
            } , 

};


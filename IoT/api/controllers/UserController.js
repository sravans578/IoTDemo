/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

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
      User.create({//bicrypt
        "deviceid": req.body.deviceid,
        "username": req.body.username,
        "password": req.body.password,
        "devicegw": req.body.devicegw,
      }).exec(function(err) {
        if (err) {
          return res.ok({
            success: 'Registration Failed'
          });
        }
        else
        {
          return res.ok({
            success: 'Registration Successful'
          });
        }
      })
   
  }
};
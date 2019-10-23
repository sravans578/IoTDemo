/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: function(req, res){
        console.log("hi");
        User.create({name:'Finn', password:"password"}).exec(function(err,result){
            if (err) {
                  sails.log.debug('Some error occured ' + err);
                  return res.json(500, { error: 'Please enter valid user name and password' });
              }
              else
                  {
                    if(result){
                     console.log("Success");
                     res.json(200, {login : "success"});
                    }
                  else
                    {
                      return res.json(500, { error: 'Please enter valid user name and password' });
                    }
                   
                  } 
        });
    ;   
    }  

   

  };





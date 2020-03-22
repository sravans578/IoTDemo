/**
 * FinalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
display : function (req, res) {
    console.log('here');
    console.log(req.body.data);
    // console.log(req);
}

};


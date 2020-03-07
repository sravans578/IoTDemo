/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    deviceid:{
     type: 'string',
     required: true
    },
    username:
    {
      type: 'string',
      required: true,
    },  
    password:{
      type: 'string',
      required: true
     },
     devicegw:
     {
       type: 'string',
       required: true,
     },  

  },

};


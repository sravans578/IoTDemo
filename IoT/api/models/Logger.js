/**
 * Logger.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    IP:{
      type: 'string',
      required: false
     },
 
     requestUrl:{
      type: 'string',
      required: false
     },
     requestBody:{
      type: 'string',
      required: false
     },
     method:{
      type: 'string',
      required: false
     },
     requestHeaders:{
      type: 'string',
      required: false
     },
     responseTime:{
      type: 'string',
      required: false
     },
     responseCode:{
      type: 'string',
      required: false
     },
  },

};


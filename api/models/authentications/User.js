/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'authMongo',
  schema: true,

  attributes: {

    // -------------------------------------------------------------------------
    // Relationships

    authCode:{
      collection: 'AuthCode',
      via: 'user'
    },

    acessToken:{
      collection: 'AccessToken',
      via: 'user'
    },

    role: {
      model: 'Role'
    },

    // -------------------------------------------------------------------------
    // Fields

    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    fullName: {
      type: 'string',
      required: true,
      unique: true
    },
    image: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();

      delete obj.authCode;
      delete obj.acessToken;
      delete obj.password;

      return obj;
    }

  }

};


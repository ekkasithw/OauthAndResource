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

    scopes:{
      collection: 'Scope',
      via: 'clients'
    },
    authCodes:{
      collection: 'AuthCode',
      via: 'client'
    },
    acesssTokens:{
      collection: 'AccessToken',
      via: 'client'
    },

    // -------------------------------------------------------------------------
    // Fields

    type: {
      type: 'string',
      required: true,
      'in': ['public', 'confidential']
    },
    secret: {
      type: 'string',
      required: true,
      unique: true
    },
    redirectURL: {
      type: 'string',
      required: true,
      url: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true,
      unique: true
    }

  }

};


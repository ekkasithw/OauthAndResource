/**
* AccessToken.js
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

    clients: {
      collection: 'Client',
      via: 'scopes'
    },
    roles: {
      collection: 'Role',
      via: 'scopes'
    },

    // -------------------------------------------------------------------------
    // Fields

    name: {
      type: 'string',
      required: true,
      unique: true
    }

  }

};


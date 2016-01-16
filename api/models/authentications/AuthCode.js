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

    user: {
      model: 'User'
    },
    client: {
      model: 'Client'
    },

    // -------------------------------------------------------------------------
    // Fields

    code: {
      type: 'string',
      required: true
    },

    expire: {
      type: 'datetime',
      required: true
    },

    // -------------------------------------------------------------------------
    // Instance Methods

    isExpired: function() {
      return sails.moment(this.expire).isBefore();
    },

    refresh: function() {
      var authCodeLife = sails.config.oauth.authCodeLife;
      var expire = sails.moment().add(authCodeLife, 'minutes').toISOString();

      this.code = sails.randToken.generate(16);
      this.expire = expire;

      return this.save();
    },

    makeItExpire: function() {
      var authCodeLife = sails.config.oauth.authCodeLife;
      var expire = sails.moment().subtract(authCodeLife * 2, 'minutes').toISOString();

      this.expire = expire;

      return this.save();
    }

  },

  // -------------------------------------------------------------------------
  // Class Methods

  generate: function(clientId, userId) {
    var authCodeLife = sails.config.oauth.authCodeLife;
    var expire = sails.moment().add(authCodeLife, 'minutes').toISOString();

    var authCode = {
      code: sails.randToken.generate(16),
      expire: expire,
      client: clientId,
      user: userId
    };

    return this.create(authCode);
  }

};


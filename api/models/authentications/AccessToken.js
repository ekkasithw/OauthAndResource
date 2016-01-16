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

    client: {
      model: 'Client'
    },
    user: {
      model: 'User'
    },

    // -------------------------------------------------------------------------
    // Fields

    token: {
      type: 'string',
      required: true
    },

    expire: {
      type: 'datetime',
      required: true
    },

    refreshToken: {
      type: 'string',
      required: true
    },

    refreshTokenExpire: {
      type: 'datetime',
      required: true
    },

    // -------------------------------------------------------------------------
    // Instance Methods

    isExpired: function() {
      return sails.moment(this.expire).isBefore();
    },

    refreshIsExpired: function() {
      return sails.moment(this.refreshTokenExpire).isBefore();
    },

    refresh: function() {
      var accessTokenLife = sails.config.oauth.accessTokenLife;
      var expire = sails.moment().add(accessTokenLife, 'minutes').toISOString();

      this.token = sails.randToken.generate(16);
      this.expire = expire;

      return this.save();
    },

    makeItExpire: function() {
      var accessTokenLife = sails.config.oauth.accessTokenLife;
      var expire = sails.moment().subtract(accessTokenLife * 2, 'minutes').toISOString();

      this.expire = expire;

      return this.save();
    },

    toJSON: function() {
      var obj = this.toObject();

      delete obj.client;
      delete obj.user;

      return obj;
    }

  },

  // -------------------------------------------------------------------------
  // Class Methods

  generate: function(clientId, userId) {
    var accessTokenLife = sails.config.oauth.accessTokenLife;
    var expire = sails.moment().add(accessTokenLife, 'minutes').toISOString();

    var refreshTokenLife = sails.config.oauth.refreshTokenLife;
    var refreshTokenExpire = sails.moment().add(refreshTokenLife, 'minutes').toISOString();

    var accessToken = {
      client: clientId,
      user: userId,
      token: sails.randToken.generate(16),
      expire: expire,
      refreshToken: sails.randToken.generate(16),
      refreshTokenExpire: refreshTokenExpire
    };

    return this.create(accessToken);
  }

};


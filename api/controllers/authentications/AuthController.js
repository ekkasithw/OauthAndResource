/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  getAuth: function (req, res) {
    return res.view('login');
  },

  postAuth: function (req, res) {
    var clientId = req.client.id;
    var responseType = req.param('responseType');

    var config = {
      successRedirect: url.make('/scope', clientId, responseType),
      failureRedirect: url.make('/authorize', clientId, responseType),
      failureFlash: true
    }

    passport.authenticate('local', config)(req, res);
  },

  getScope: function(req, res) {
    return res.view('scope');
  },

  postScope: function(req, res) {
    var clientScopeIds = _.pluck(req.client.scopes, 'id');
    var userRoleScopeIds = _.pluck(req.user.role.scopes, 'id');

    var intersection = _.intersection(clientScopeIds, userRoleScopeIds);

    if (intersection.length !== clientScopeIds.length) {
      req.flash('error', 'Cannot approve all scopes');

      var destination = url.make('/scope', req.client.id, req.param('responseType'));
      return res.redirect(destination);
    }

    AuthCode.generate(req.client.id, req.user.id)
      .then(function(thisAuthCode) {
        var destination = url.make('/scope', req.client.id, req.param('responseType'));
        return res.redirect(destination);
      })
      .catch(function(err) {
        return res.serverError(err.message, '500');
      });
  },

  postToken: function(req, res) {
    switch (req.param('grantType')) {
      case 'authorizationCode':
        var find = {
          client: req.authCode.client,
          user: req.authCode.user
        }

        AccessToken.findOne(find)
          .then(function(thisAccessToken) {
            if (! thisAccessToken) return [
              AccessToken.generate(req.authCode.client, req.authCode.user),
              req.authCode.makeItExpire()
            ];

            return [thisAccessToken.refresh(), req.authCode.makeItExpire()];
          })
          .spread(function(thisAccessToken, thisAuthCode) {
            var json = thisAccessToken.toJSON();
            return res.json(json);
          })
          .catch(function(err) {
            return res.serverError(err.message, '500');
          });

        break;
      case 'refreshToken':
        AccessToken.findOne({refreshToken: req.param('refreshToken')})
          .then(function(thisAccessToken) {
            return thisAccessToken.refresh();
          })
          .then(function(thisAccessToken) {
            var json = thisAccessToken.toJSON();
            return res.json(json);
          })
          .catch(function(err) {
            return res.serverError(err.message, '500');
          })
        break;
    }
  },

  getMe: function(req, res) {
    var find = {
      id: req.accessToken.user
    };

    User.findOne(find).populate('role')
      .then(function(thisUser) {
        var json = thisUser.toJSON();
        return res.json(json);
      })
      .catch(function(err) {
        return res.serverError(err.message, '500');
      });
  }

};


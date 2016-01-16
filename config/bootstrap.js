/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  sails.md5 = require('md5');
  sails.moment = require('moment');
  sails.randToken = require('rand-token');

  return cb();

  var client = {
    "type": "public",
    "secret": sails.md5('1234'),
    "redirectURL": "http://localhost:1337",
    "email": "ekkasith.w@gmail.com",
    "name": "Trip Planer"
  };

  var clientScopes = [
    'Manage Trip'
  ];

  var role = {
    name: 'Authenticated User'
  };

  var roleScopes = [
    'Manage Trip'
  ];

  var user = {
    "email": "ekkasith.w@gmail.com",
    "password": sails.md5('1234'),
    "fullName": "Ekkasith Wisanphokha",
    "image": "/profile_images/profile.jpg"
  };

  var scopes = [];
  sails.config.oauth.scopes.forEach(function(scope) {
    scopes.push({name: scope});
  });


  Scope.create(scopes)
    .then(function(theseScopes) {
      var promises = [
        theseScopes,
        Client.create(client),
        Role.create(role)
      ];

      return promises;
    })
    .spread(function(theseScopes, thisClient, thisRole) {
      var clientScopeIds = [];
      var roleScopeIds = [];
      theseScopes.forEach(function(scope) {
        if (clientScopes.indexOf(scope.name) > -1) {
          clientScopeIds.push(scope.id);
        }
        if (roleScopes.indexOf(scope.name) > -1) {
          roleScopeIds.push(scope.id);
        }
      });

      thisClient.scopes.add(clientScopeIds);
      thisClient.save();

      thisRole.scopes.add(roleScopeIds);
      thisRole.save();

      user.role = thisRole.id;
      return User.create(user);
    });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};

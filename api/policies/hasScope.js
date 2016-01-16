



module.exports = function(req, res, next) {
  Client.findOne({id: req.accessToken.client})
    .populate('scopes')
    .then(function(thisClient) {
      var controller = req.options.controller[0].toUpperCase() + req.options.controller.slice(1) + 'Controller';

      var scopes = sails.config.oauth.actionScopes['*'];

      if (sails.config.oauth.actionScopes[controller]) {
        if (sails.config.oauth.actionScopes[controller][req.options.action]) {
          scopes.push(sails.config.oauth.actionScopes[controller][req.options.action]);
        }
      }

      for (key in thisClient.scopes) {
        var thisScope = thisClient.scopes[key];

        if (scopes.indexOf(thisScope.name) > -1) {
          req.accessToken.client = thisClient;
          return next();
        }
      }

      return res.forbidden('Invalid scopes');
    })
    .catch(function(err) {
      res.serverError(err.message);
    });
};

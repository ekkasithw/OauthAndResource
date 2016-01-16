



module.exports = function(req, res, next) {
  var find = {
    id: req.param('clientId'),
    secret: req.param('clientSecret')
  };

  Client.findOne(find).populate('scopes')
    .then(function(thisClient) {
      if (! thisClient) return res.forbidden('Invalid client', '403');

      req.client = thisClient;

      return next();
    })
    .catch(function(err) {
      return res.serverError(err.message, '500');
    });
};

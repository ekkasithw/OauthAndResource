



module.exports = function(req, res, next) {
  var responseType = req.param('responseType');
  if (! responseType) return res.badRequest('Response type required', '400');

  var validResponseType = sails.config.oauth.responseTypes.indexOf(responseType);
  if (validResponseType < 0) return res.forbidden('Invalid response type', '403');

  var clientId = req.param('clientId');
  if (! clientId) return res.badRequest('Client id required', '400');

  Client.findOne({id: clientId}).populate('scopes')
    .then(function(thisClient) {
      if (! thisClient) return res.notFound('Client not found', '404');

      req.client = thisClient;

      return next();
    })
    .catch(function(err) {
      res.serverError(err.message, '500');
    });
};

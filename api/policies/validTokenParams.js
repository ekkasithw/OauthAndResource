



module.exports = function(req, res, next) {
  var grantType = req.param('grantType');
  if (! grantType) return res.badRequest('Grant type required', '400');

  var validGrantType = sails.config.oauth.grantTypes.indexOf(grantType);
  if (validGrantType < 0) return res.forbidden('Invalid grant type', '403');

  switch (grantType) {
    case 'authorizationCode':
      var code = req.param('authCode');
      if (! code) return res.badRequest('Authorization code required', '400');
      break;
    case 'refreshToken':
      var refreshToken = req.param('refreshToken');
      if (! refreshToken) return res.badRequest('Refresh token required', '400');
      break;
  }

  var clientId = req.param('clientId');
  if (! clientId) return res.badRequest('Client id required', '400');

  var clientSecret = req.param('clientSecret');
  if (! clientSecret) return res.badRequest('Client secret required', '400');

  return next();
};

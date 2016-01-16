



module.exports = function(req, res, next) {
  switch (req.param('grantType')) {
    case 'authorizationCode':
      AuthCode.findOne({code: req.param('authCode')})
        .then(function(thisAuthCode) {
          if (! thisAuthCode) return res.forbidden('Invalid authorization code', '403');

          if (thisAuthCode.client != req.client.id) {
            return res.forbidden('Authorization code is not for this client', '403');
          }

          if (thisAuthCode.isExpired()) return res.badRequest('Authorization code expired', '400');

          req.authCode = thisAuthCode;

          return next();
        })
        .catch(function(err) {
          return res.serverError(err.message, '500');
        })
      break;
    case 'refreshToken':
      AccessToken.findOne({refreshToken: req.param('refreshToken')})
        .then(function(thisAccessToken) {
          if (! thisAccessToken) return res.forbidden('Invalid refresh token', '403');

          if (thisAccessToken.client != req.client.id) {
            return res.forbidden('Refresh token is not for this client', '403');
          }

          if (thisAccessToken.refreshIsExpired()) return res.badRequest('Refresh token expired', '400');

          req.accessToken = thisAccessToken;

          return next();
        })
        .catch(function(err) {
          return res.serverError(err.message, '500');
        })
      break;
  }
};

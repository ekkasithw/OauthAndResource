



module.exports = function(req, res, next) {
  if (!req.headers.authorization) return res.forbidden('Invalid access token');

  var token = req.headers.authorization.split(' ')[1];

  AccessToken.findOne({token: token})
    .then(function(thisAccessToken) {
      if (! thisAccessToken) return res.forbidden('Invalid access token');

      if (thisAccessToken.isExpired()) return res.forbidden('Access token expired');

      req.accessToken = thisAccessToken;

      delete req.query.accessToken;

      return next();
    })
    .catch(function(err) {
      res.serverError(err.message);
    });
};

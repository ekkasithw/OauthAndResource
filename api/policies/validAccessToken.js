



module.exports = function(req, res, next) {
  AccessToken.findOne({token: req.param('accessToken')})
    .then(function(thisAccessToken) {
      if (! thisAccessToken) return res.forbidden('Invalid access token');

      if (thisAccessToken.isExpired()) return res.notFound('Access token expired');

      req.accessToken = thisAccessToken;

      delete req.query.accessToken;

      return next();
    })
    .catch(function(err) {
      res.serverError(err.message);
    });
};





module.exports = function(req, res, next) {
  var is_auth = req.isAuthenticated();

  if (is_auth) {
    var clientId = req.client.id;
    var responseType = req.param('responseType');

    var destination = url.make('/scope', clientId, responseType);
    return res.redirect(destination);
  }

  return next();
};





module.exports = function(req, res, next) {
  var find = {
    client: req.param('clientId'),
    user: req.user.id
  }

  var promise = AuthCode.findOne(find).populate('client')
    .then(function(thisAuthCode) {
      if (thisAuthCode) {
        var isExpired = thisAuthCode.isExpired();
        if (isExpired) return thisAuthCode.refresh();

        return thisAuthCode;
      }

      next();
      return promise.cancel();
    })
    .then(function(thisAuthCode) {
      var responseType = req.param('responseType');
      var redirectUrl = thisAuthCode.client.redirectURL;

      var token = null;
      switch (responseType) {
        case 'code':
          var destination = url.makeClientRedirect(redirectUrl, thisAuthCode.code, responseType);
          return res.redirect(destination);
        case 'token':
          AccessToken.findOne(find)
            .then(function(thisAccessToken) {
              if (! thisAccessToken) return AccessToken.generate(req.client.id, req.user.id);
              return thisAccessToken.refresh(req.client.id, req.user.id);
            })
            .then(function(thisAccessToken) {
              var destination = url.makeClientRedirect(redirectUrl, thisAccessToken.token, responseType);
              return res.redirect(destination);
            })
            .catch(function(err) {
              return Promise.reject(err);
            })
      }
    })
    .catch(function(err) {
      return res.serverError(err.message, '500');
    })
    .cancellable();
};

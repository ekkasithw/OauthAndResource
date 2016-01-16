



module.exports = {
  make: function(path, clientId, responseType) {
    return path + '?clientId=' + clientId + '&responseType=' + responseType;
  },

  makeClientRedirect: function(redirectUrl, code, responseType) {
    switch (responseType) {
      case 'code':
        return redirectUrl + '?authCode=' + code;
      case 'token':
        return redirectUrl + '#authCode=' + code;
    }
  }
};

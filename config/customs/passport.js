



var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// ---------------------------------------------------------------------------------------------------------------------
// Session

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({id: id})
  .then(function(thisUser) {
    if (! thisUser) return done(null, false, {message: 'User id ' + id + ' cannot be found.'});

    Role.findOne({id: thisUser.role}).populate('scopes')
    .then(function(thisRole) {
      thisUser.role = thisRole;
      return done(null, thisUser);
    })
    .catch(function(err) {
      return done(err);
    });
  })
  .catch(function(err) {
    return done(err, false);
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Strategy

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    var credential = {
      email: email,
      password: sails.md5(password)
    };

    User.findOne(credential)
      .then(function(thisUser) {
        if (! thisUser) return done(null, false, {message: 'Invalid email or password'});
        return done(null, thisUser);
      })
      .catch(function(err) {
        return done(err);
      });
  }
));

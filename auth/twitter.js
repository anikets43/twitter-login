var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({ _id: id.doc._id }, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
  consumerKey: "97tXFgehNIUYGHYlU0v8VGWTO",
  consumerSecret: "5qFhpaXNGAHHDBpRFQU8vMEtyp52ncLgorHYYUVGdyzrzra6D3",
  callbackURL: "https://posiwise.com"
},

  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ name: profile.displayName }, { name: profile.displayName, userid: profile.id }, function (err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;

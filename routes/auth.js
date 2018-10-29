var express = require('express');
var router = express.Router();
var passportTwitter = require('../auth/twitter');

/* LOGIN ROUTER */
router.get('/login', function (req, res, next) {
  debugger;
  res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

/* TWITTER ROUTER */
router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/users');
  });

module.exports = router;

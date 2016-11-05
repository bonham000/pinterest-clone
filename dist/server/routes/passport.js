'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require('passport-twitter');

var _passportTwitter2 = _interopRequireDefault(_passportTwitter);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require('../jwt-config');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = module.exports = _express2.default.Router();

function createToken(username) {
  return _jsonwebtoken2.default.sign({ user: username }, _jwtConfig2.default, { expiresIn: 60 * 60 });
}

// define Twitter strategy
_passport2.default.use(new _passportTwitter2.default({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
  // search database based on twitter profile ID because twitter API does not provide email
  _users2.default.findOne({ id: profile.id }, function (err, user) {
    //handle error
    if (err) {
      return done(err);
    }
    // if user has not logged in through twitter before, create a new user        
    if (!user) {
      user = new _users2.default({
        id: profile.id,
        displayName: profile.displayName,
        username: profile.username,
        userData: []
      });
      user.save(function (err) {
        if (err) console.log(err);
        return done(err, user);
      });
      // if user has logged in through twitter before, let them proceed 
    } else {
      return done(err, user);
    }
  });
}));

// request for Twitter authentication
app.get('/auth/twitter', _passport2.default.authenticate('twitter'));

// Twitter callback
app.get('/auth/twitter/callback/', _passport2.default.authenticate('twitter', { failureRedirect: '/login' }), function (req, res) {
  // Successful authentication, redirect to for client to continue auth process
  res.redirect('/account');
});

// client verifies auth flow from passport redirect are receives jwt token in response or redirects to login page otherwise
app.post('/verify', function (req, res) {
  // if user is authenticated send them a jwt token
  if (req.isAuthenticated()) {
    res.status(201).send({
      id_token: createToken(req.user.username),
      user: req.user.username
    });
    // if session is not authenticated redirect to login
  } else {
    res.redirect('/login');
  }
});
import express from 'express'
import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import jwt from 'jsonwebtoken'
import secret from '../jwt-config'

import User from '../models/users'

const app = module.exports = express.Router();

function createToken(username) { return jwt.sign({user: username}, secret, { expiresIn: 60 * 60 }) }

// define Twitter strategy
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // search database based on twitter profile ID because twitter API does not provide email
    User.findOne({ id: profile.id }, function(err, user) {
      //handle error
      if (err) { return done(err) }
      // if user has not logged in through twitter before, create a new user        
      if (!user) {
        user = new User({
            id: profile.id,
            displayName: profile.displayName,
            username: profile.username,
            userData: []
        });
        user.save(function(err) {
          if (err) console.log(err);
          return done(err, user);
        });
      // if user has logged in through twitter before, let them proceed 
      } else { return done(err, user) }
    });
   }
));

// request for Twitter authentication
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter callback
app.get('/auth/twitter/callback/', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to for client to continue auth process
    res.redirect('/account');
});

// client verifies auth flow from passport redirect are receives jwt token in response or redirects to login page otherwise
app.post('/verify', function(req, res){
  // if user is authenticated send them a jwt token
  if (req.isAuthenticated()) {
     res.status(201).send({
      id_token: createToken(req.user.username),
      user: req.user.username
  });
  // if session is not authenticated redirect to login
  } else { res.redirect('/login') }
 });
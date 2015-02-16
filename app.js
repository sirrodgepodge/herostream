var express = require('express');
var app = express();
var compression = require('compression');
var bodyParser = require('body-parser');
var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

//setup
app.use(compression());
app.set('port', (process.env.PORT || 8060));
app.use(express.static(__dirname + '/public'));
app.use();
app.use();

//launch
app.listen(app.get('port'), function() {
  console.log("Running at localhost: " + app.get('port'));
})

//authentication
passport.use(new GoogleStrategy({
    returnURL: 'http://www.herostream.com/auth/google/return',
    realm: 'http://www.herostream.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

var express = require('express');
var app = express();
var port = process.env.PORT || 8060;
var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

//express middlewares
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//express setup
app.use(compression());
app.set('port', port);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//passport setup
app.use(session({secret: 'heroflowingholla'}));
app.use(passport.initialize());
app.use(passport.session());

//send to authfile
require(__dirname + '/app/routes.js')(app, passport);

//launch
app.listen(port, function() {
    console.log("Running at port: " + port);
})

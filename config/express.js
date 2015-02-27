var express = require('express'),
    path = require('path'),
    compression = require('compression'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');

module.exports = function (passport, mongodbURI) {
    var app = express();
    //app.use(compression());

    var root = path.normalize(__dirname + '/..');

    app.set('showStackError', true);

    app.set('port', process.env.PORT || 8060);
    app.set('views', root + '/app/views');
    app.set('view engine', 'ejs');
    app.use(favicon(root + '/p_2/favicon.ico'));//sets tiny icon
    app.use(morgan('dev'));//sets logger
    app.use(bodyParser.urlencoded({extended:false}));//easy retrieval of HTML body
    app.use(bodyParser.json());//easy retrieval of HTML body
    app.use(methodOverride());//more flexible HTTP verb usage
    app.use(cookieParser());//something with session storage

    app.use(session({
        secret: 'my-session-store',
	store: new mongoStore({
	    url: mongodbURI,
	    collection : 'sessions'
	}),
	resave: false,
	saveUninitialized: false
    }));//something with logins

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(root + '/p_2'));

    if ('development' == app.get('env')) {
        app.use(errorHandler());

        app.use(function(req, res, next) {
             console.log(req.url);
             next();
        });
    }

    return app;
};

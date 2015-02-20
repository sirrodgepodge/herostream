var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    path = require('path'),
    compression = require('compression'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');

module.exports = function (passport, mongodbURI) {
    var app = express();
    app.use(compression());

    var root = path.normalize(__dirname + '/..');

    app.set('showStackError', true);

    app.set('port', process.env.PORT || 8060);
    app.set('views', root + '/app/views');
//    app.set('view engine', 'ejs');
    app.use(favicon());//sets tiny icon
    app.use(morgan('dev'));//sets logger
    app.use(bodyParser());//easy retrieval of HTML body
    app.use(methodOverride());//more flexible HTTP verb usage
    app.use(cookieParser());//something with session storage

    app.use(session({
        secret: 'my-session-store',
        store: new mongoStore({
            url: mongodbURI,
            collection : 'sessions'
        })
    }));//something with logins

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(root + '/public'));

    if ('development' == app.get('env')) {
        app.use(errorHandler());

        app.use(function(req, res, next) {
             console.log(req.url);
             next();
        });
    }

    return app;
};

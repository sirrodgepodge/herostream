var fs = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    http = require('http'),
    mongodbURI = 'mongodb://heroflow:heroflow@ds047591.mongolab.com:47591/herodb', /* For example: mongodb://<dbuser>:<dbpassword>@host.com:port/my-app-db */
    facebookAppId = '1559371857666734',
    facebookAppSecret = '56470ced89703228ac405356a25514f3',
    models_path = __dirname + '/app/models';

mongoose.connect(mongodbURI);

fs.readdirSync(models_path).forEach(function(file) {
    if (file.substring(-3) === '.js') {
        require(models_path + '/' + file);
    }
});

require('./config/passport')(passport, facebookAppId, facebookAppSecret);

var app = require('./config/express')(passport, mongodbURI);

require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app;

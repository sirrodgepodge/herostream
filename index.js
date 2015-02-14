var express = require('express');
var app = express();
var compression = require('compression')

//setup
app.use(compression());
app.set('port', (process.env.PORT || 8060));
app.use(express.static(__dirname + '/public'));

//launch
app.listen(app.get('port'), function() {
  console.log("Running at localhost: " + app.get('port'));
})

var express = require('express');
var app = express();
var port = process.env.PORT || 8060;

//express middlewares
var compression = require('compression');

//express setup
app.use(compression());
app.set('port', port);
app.use(express.static(__dirname + "/public")

//launch
app.listen(port, function() {
    console.log("Running at port: " + port);
})

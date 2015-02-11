var express = require('express');
var app = express(); 
var compression = require('compression');

//Setup
app.use(compression());
app.use(express.static(__dirname + '/static/'));

console.log(__dirname);

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/static/index.html');
});

app.listen(8060);
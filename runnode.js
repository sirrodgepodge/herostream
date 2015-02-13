var express = require('express');
var app = express(); 
var compression = require('compression');

//Setup
app.use(compression());
app.use(express.static(__dirname + '/public/'));

console.log(__dirname);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
    response.end();
});

app.listen(8060);

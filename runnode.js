var express = require('express');
var app = express(); 
var compression = require('compression');

//setup
app.use(compression());
app.use(express.static(__dirname + '/public/'));

//launch
console.log(__dirname);
app.listen(8060);

var express = require('express');
var app = express();
var compression = require('compression')

app.use(compression());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/static/index.html');
  response.end();
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})

// Node.js - Express sample application

var express = require('express')
var app = express()
app.use(express.static('public'));

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
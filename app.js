var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

var wordData = [];
app.get('/getdata', function(req,res) {
  if (req.query.key.length == 1) {
    fs.readFile(path.join(__dirname, '/wordbank/', req.query.key + '.json'), 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        results = JSON.parse(data);
        res.json(results);
      }
    });
  }
});

app.listen(port, function(){
  console.log("Port is now running on: " + port);
});

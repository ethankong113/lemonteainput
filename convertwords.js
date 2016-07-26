var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
//var Excel = require('exceljs');
var xlsx2json = require('xlsx-json');

var task = require('./task.json');

//var workbook = new Excel.Workbook();
/*
app.get('/getdata', function(req, res) {

})

app.listen(3000, function(){
  console.log("port running.")
})
*/
//Unblock the following part to convert XLSX file into JSON file.
/*
xlsx2json(task, function(err, jsonArr) {
    if (err) {
        console.log(err);
        return;
    }
    // Do sth with jsonArr
});
*/

fs.readFile(__dirname+'/words.json', 'utf8', function(err,data){
  var results = JSON.parse(data);
  var arr = {};
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < results[i][1].length; j++) {
      if (results[i][0][0] == "C") {
        arr[results[i][1][j]] = {key: results[i][0], ranking: 1};
      }
    }
  }
  fs.writeFile('wordbank/c.json', JSON.stringify(arr), 'utf8', (err) => {
    if (err) throw err;
    console.log("Job Done");
  });
});

//C-------------------------------------
fs.readFile(__dirname+'/words.json', 'utf8', function(err,data){
  var results = JSON.parse(data)
  var arr = {}
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < results[i][1].length; j++) {
      if (results[i][0][0] == "C") {
        arr[results[i][1][j]] = {key: results[i][0], ranking: 1}
      }
    }
  }
  arr["臭閪"] = {key: "CH", ranking: 1}
  fs.writeFile('c.json', JSON.stringify(arr), 'utf8', (err) => {
    if (err) throw err;
    console.log("Job Done")
  })
})

//G-------------------------------------
fs.readFile(__dirname+'/words.json', 'utf8', function(err,data){
  var results = JSON.parse(data)
  var arr = {}
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < results[i][1].length; j++) {
      if (results[i][0][0] == "G") {
        arr[results[i][1][j]] = {key: results[i][0], ranking: 1}
      }
    }
  }
  arr["鳩"] = {key: "GOU", ranking: 1}

  fs.writeFile('g.json', JSON.stringify(arr), 'utf8', (err) => {
    if (err) throw err;
    console.log("Job Done")
  })
})

//L-----------------------------------
fs.readFile(__dirname+'/words.json', 'utf8', function(err,data){
  var results = JSON.parse(data)
  var arr = {}
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < results[i][1].length; j++) {
      if (results[i][0][0] == "L") {
        arr[results[i][1][j]] = {key: results[i][0], ranking: 1}
      }
    }
  }

  arr["撚"] = {key: "LUN", ranking: 1}

  fs.writeFile('l.json', JSON.stringify(arr), 'utf8', (err) => {
    if (err) throw err;
    console.log("Job Done")
  })
})

//O-----------------------------------
fs.readFile(__dirname+'/words.json', 'utf8', function(err,data){
  var results = JSON.parse(data)
  var arr = {}
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < results[i][1].length; j++) {
      if (results[i][0][0] == "O") {
        arr[results[i][1][j]] = {key: results[i][0], ranking: 1}
      }
    }
  }
  arr["戇"] = {key: "ON", ranking: 1}
  arr["戇鳩"] = {key: "OG", ranking: 1}
  arr["戇鳩鳩"] = {key: "OGG", ranking: 1}
  arr["戇撚鳩鳩"] = {key: "OLGG", ranking: 1}
  arr["戇撚鳩鳩食賓周"] = {key: "OLGGSBC", ranking: 1}

  fs.writeFile('o.json', JSON.stringify(arr), 'utf8', (err) => {
    if (err) throw err;
    console.log("Job Done")
  })
})

//P-----------------------------------
fs.readFile(__dirname+'/words.json', 'utf8', function(err,data){
  var results = JSON.parse(data)
  var arr = {}
  for (var i = 0; i < results.length; i++) {
    for (var j = 0; j < results[i][1].length; j++) {
      if (results[i][0][0] == "P") {
        arr[results[i][1][j]] = {key: results[i][0], ranking: 1}
      }
    }
  }
  arr["仆街"] = {key: "PK", ranking: 1}
  arr["仆街冚家產"] = {key: "PKHGC", ranking: 1}

  fs.writeFile('p.json', JSON.stringify(arr), 'utf8', (err) => {
    if (err) throw err;
    console.log("Job Done")
  })
})

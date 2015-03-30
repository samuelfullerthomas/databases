var express = require('express');
var db = require('./db');
var mysql = require('mysql');

//mysql login
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}


app.all('*', function(req, res, next){
  res.header("Content-Type", "application/json");
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("access-control-allow-origin", "*");
  res.header("access-control-allow-headers", "content-type, accept");
  res.header("access-control-max-age", 10);

  if(req.method === 'OPTIONS'){
    res.status(200).send(null);
  } else {
    return next();
  }
});

app.post('/messages', function(req, res){
  console.log('any post happening');

  connection.connect();
  connection.query("INSERT INTO messages(text, user_id, room) VALUES ('another text', 8, 'lobby')", function(err, results, fields){
    if (err){
      console.log(err)
    }
    console.log('post results ' , results)
  });
  //connection.end();
  //to be replaced with mysql queries connection.query()
  // fs.readFile('database.json', {encoding: 'utf8'}, function(err, data) {
  //   var toWrite = [];
  //   if (!err) {
  //     toWrite = JSON.parse(data);
  //   } 

  //   req.body.objectId = toWrite.length;
  //   toWrite.push(req.body);

  //   fs.writeFile('database.json', JSON.stringify(toWrite), function() {
  //     res.sendStatus(201);
  //   });

  // }); 
});

app.get('/messages', function(req, res) {

  connection.connect();
  connection.query("SELECT text FROM messages WHERE user_id = 7", function (err, results) {
    if (err) {
      console.log('get error');
    }
    console.log('results' ,results);
  });
  connection.end();

  // fs.readFile('database.json', {encoding: 'utf8'}, function(err, data) {
  //   var t = [];
  //   if (!err) {
  //     t = JSON.parse(data);
  //     t.reverse();
  //   } 
  //  res.status(200).send(JSON.stringify({results:t}))
  // })
})


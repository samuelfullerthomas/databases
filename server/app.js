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
var userId;

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

// connection.connect();
//if it doesnt exist store it
// connection.query("INSERT INTO users (user_name) VALUES (?) WHERE\
//  NOT EXISTS (SELECT * FROM users WHERE user_name = ?)", [username, username, username], errorHandler)

app.post ('/users', function (req, res) {
  var username = req.body.username;
  var nameExists = true;
  connection.query("SELECT id from users WHERE user_name = ?", [username], function (err, results) {
    if(err){
      return
    }
    if (results.length < 1) {
      nameExists = false;
      connection.query("INSERT INTO users(user_name) VALUES (?)", [username], function (err, results) {
        if (err) {return}
        connection.query("SELECT id from users WHERE user_name = ?", [username], function (err, results) {
          if (err) {return}
          userId = results[0].id;
        });
      })
    }
  })
  res.sendStatus(201)
});



app.post('/messages', function(req, res){


  console.log(req.body.text, req.body.roomname);
  // connection.connect();
  connection.query("INSERT INTO messages(text, user_id, room) \
    VALUES (?, ?, ?)", [req.body.text, userId, req.body.roomname], errorHandler);
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

  // connection.connect();
  connection.query("SELECT * FROM messages WHERE user_id = 7", function (err, results) {
    if (err) {
      console.log('get error');
    }
    //res.status(200).send(results)
  });
  // connection.end();

  // fs.readFile('database.json', {encoding: 'utf8'}, function(err, data) {
  //   var t = [];
  //   if (!err) {
  //     t = JSON.parse(data);
  //     t.reverse();
  //   } 
  //  res.status(200).send(JSON.stringify({results:t}))
  // })
})
function errorHandler(error, results, fields){
  if(error){
    console.log('error')
  }
}


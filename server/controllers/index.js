var models = require('../models');
var bluebird = require('bluebird');
var db = require ('../db')

var userId;

module.exports = {
  messages: {
    get: function (req, res) {
//   connection.query("SELECT * FROM messages WHERE user_id = 7", function (err, results) {
//     if (err) {
//       console.log('get error');
//     }
//     //res.status(200).send(results)
//   });
//   // connection.end();

//   // fs.readFile('database.json', {encoding: 'utf8'}, function(err, data) {
//   //   var t = [];
//   //   if (!err) {
//   //     t = JSON.parse(data);
//   //     t.reverse();
//   //   } 
//   //  res.status(200).send(JSON.stringify({results:t}))
//   // })
// }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('userId', userId)
      models.messages.post(req.body, userId) 
    }
   },

  users: {
    // Ditto as above
    get: function (req, res) {},

    //NEED TO PUT CALLBACKS IN THESE FUNCTIONS
    post: function (req, res) {
      var username = req.body.username;
      models.users.get(username, function (data) {
          userId = data;
          console.log("Post return userId " + userId)
          if (userId === undefined) {
              models.users.post(username, function (data) {
              userId = data;
            });
          }
          res.sendStatus(201)
      });
    }
  }
};


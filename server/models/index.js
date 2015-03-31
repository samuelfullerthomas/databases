var db = require('../db');

var id;
module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message, userId) {
      db.query("INSERT INTO messages(text, user_id, room) VALUES (?, ?, ?)",
       [message.text, userId, message.roomname], errorHandler);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query("SELECT id from users WHERE user_name = ?", [username], function (err, results) {
        if(err){
          console.log('get error');
        }
        callback(results[0].id);
      })
    },
    post: function (username) {
       db.query("INSERT INTO users(user_name) VALUES (?)", [username], errorHandler)
    }
  } 
};

// connection.query("INSERT INTO users (user_name) VALUES (?) WHERE\
//  NOT EXISTS (SELECT * FROM users WHERE user_name = ?)", [username, username, username], errorHandler)


function errorHandler(error, results, fields){
  if(error){
    console.log('error')
  }
}



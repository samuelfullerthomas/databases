var db = require('../db');

var id;
module.exports = {
  messages: {
    get: function (callback) {
      db.query("SELECT * FROM messages JOIN users ON messages.user_id = users.id", function (err, results){
        if (err){
          console.log('MESSAGES.GET ERROR ERROR ERROR')
        }
        callback(results)
      })
    }, // a function which produces all the messages
    post: function (message, userId) {
      db.query("INSERT INTO messages(text, user_id, room) VALUES (?, ?, ?)",
       [message.text, userId, message.roomname], function (error, results){
        if(error){
          console.log('MESSAGE POST ERROR ' + error)
        }
       });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username, callback) {
      db.query("SELECT id from users WHERE username = ?", [username], function (err, results) {
        if(err){
          console.log('get error');
        }
        console.log(results)
        if (results.length>0) {
          callback(results[0].id);          
        } else {
          callback(undefined)
        }
      })
    },
    post: function (username, callback) {
       db.query("INSERT INTO users(username) VALUES (?)", [username], function (err, results){
        if(err){
          console.log(' INSERTING USER ERROR')
        }
        callback(results.insertId)
       })
    }
  } 
};

// connection.query("INSERT INTO users (username) VALUES (?) WHERE\
//  NOT EXISTS (SELECT * FROM users WHERE username = ?)", [username, username, username], errorHandler)


function errorHandler(error, results, fields){
  if(error){
    console.log('error')
  }
}



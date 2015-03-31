var models = require('../models');
var bluebird = require('bluebird');
var db = require ('../db')

var userId;

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data){
        console.log(data)
        var returnObj = {};
        returnObj.results=data;
        res.status(200).send(JSON.stringify(returnObj))
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
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


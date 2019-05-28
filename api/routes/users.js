var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt")
var User = require("../models/user")

router.post('/signup', function(req, res, next) {
  User.find({username: req.body.username})
    .then((user)=> {

      if(user.length > 0 ) res.status(403).json({message: "Username already taken"})
      else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
              if(err) res.status(500).json({message: err})
              else {
                User.create({
                  username: req.body.username,
                  password: hash
                })
                .then(()=> {
                  res.status(200).json({message: "Signed up"})
                })
                .catch((err)=> {
                  res.status(500).json({message: err})
                })
              }
          });
        });
      }
    })
});

router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username})
    .then((user)=> {
      if(user) {
        bcrypt.compare(req.body.password, user.password, function(err, match){
          if(err) res.status(500).json({message: err}) 
          else if(match) {
            delete user.password
            req.session.user = user
            res.status(200).json({message: "Logged in."})
          } else {
            res.status(403).json({message: "Invalid credentials."})
          }
        })
      } else {
        res.status(403).json({message: "Invalid credentials."})
      }
    })
    .catch((err)=> {
      res.status(500).json({message: err}) 
    })
});

router.post("/get-user", (req, res)=> {
  if(req.session.user) {
    res.status(200).json(req.session.user)
  } else {
    res.status(403).json({message: "Not logged in"})
  }
})

router.post("/logout", (req, res)=> {
  if(req.session.user) {
    req.session.destroy()
    res.status(200).json({message: "Logged out"})
  } else {
    res.status(403).json({message: "Not logged in"})
  }
})

module.exports = router;

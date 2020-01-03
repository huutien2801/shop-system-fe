var userDB = require('../models/user');
var cartDB = require('../models/cart');
var receiverDB = require('../models/receiver');
var orderDB = require('../models/order');
var orderedProDB = require('../models/orderedproduct');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var cartDB = require("../models/cart");

module.exports.register = function(req,res,next) {
  res.render('auth/register');
}

module.exports.postRegister = function(req,res,next){
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password,saltRounds);
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  
  var entity = {
    CliUserName: req.body.username,
    CliPassword: hash,
    CliName: req.body.name,
    CliEmail: req.body.email,
    CliDateOfBirth : dob,
    Permission: 0
  }

  userDB.add(entity).then(id => {
    console.log(id);
    res.redirect('/auth/login');
  })
}

module.exports.isAvailable = function(req,res){

  var user = req.query.username;
  userDB.singleByUsername(user).then(rows => {
    if ( rows.length > 0)
    {
      return res.json(false);
    }
    return res.json(true);
  })

}

module.exports.login = function(req,res,next){
  res.render('auth/login', {
    err_message: ''
  });
}

module.exports.postLogin = function(req,res,next){
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('auth/login', {
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      var retUrl;
      switch (user.Permission) {
        case 1:
        retUrl = '/admin';
        break;
        default:
        retUrl = '/';
        break;
      }
      
      return res.redirect(retUrl);
    });
  })(req, res, next);
}

module.exports.updateProfile = function (req, res) {
  var id = req.user.CliId;
  userDB.single(id).then(user => {
    if (!user) {
      return res.redirect('/');
    }
    res.render("auth/update-profile", {
      layout: false,
      title: "update-profile",
      user: user
    });
  }).catch(err => {
    console.log(err);
  });
};

module.exports.postUpdateProfile = function (req, res) {
  var entity = {
    CliId: req.body.id,
    CliUserName: req.body.username,
    CliName: req.body.name,
    CliEmail: req.body.email
  }
  userDB.update(entity).then(id => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
    return res.redirect('/');
  });
};

module.exports.logout = function (req,res,next) {
  req.logOut();
  res.redirect('/auth/login');
}


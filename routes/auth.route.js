var express = require('express');
var router = express.Router();
var authController = require("../controllers/auth.controller");
var authMiddleware = require('../middlewares/auth');
var passport = require('passport');
//GET
router.get('/register',authController.register);
router.get('/is-available', authController.isAvailable);
router.get("/login", authController.login);
router.get('/profile', authController.updateProfile);
router.get('/fb',  passport.authenticate('facebook', {scope: ['email']}));
router.get('/fb/cb',passport.authenticate('facebook', {
    failureRedirect: 'back',
    successRedirect: '/'
  })
);

//POST
router.post('/register', authController.postRegister);
router.post("/login", authController.postLogin);
router.post('/profile', authMiddleware, authController.postUpdateProfile);
router.post('/logout',authMiddleware,authController.logout);
module.exports = router;
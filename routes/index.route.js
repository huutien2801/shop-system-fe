var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller');
var authAdmin = require('../middlewares/auth-admin')

router.get('/',indexController.home);
router.get('/admin', authAdmin, indexController.admin)
router.get('/page/:page',indexController.page);
router.post('/search',indexController.search);
module.exports = router;
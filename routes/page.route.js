var express = require('express');
var router = express.Router();
var pageController = require('../controllers/page.controller');

router.get('/',pageController.page);
router.get('/search',pageController.pageSearch);
module.exports = router;
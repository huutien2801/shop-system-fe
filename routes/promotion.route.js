var express = require('express');
var router = express.Router();
var controller = require('../controllers/promotion.controller')

router.get('/', controller.index);
router.get('/add', controller.add);
router.post('/add', controller.postAdd);
router.get('/update/:id', controller.update);
router.post('/update/:id', controller.postUpdate);
router.get('/delete/:id', controller.delete);
module.exports = router;
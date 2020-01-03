var express = require('express');
var router = express.Router();
var controller = require('../controllers/order.controller');
var authMiddleware = require("../middlewares/auth");

router.get('/payment', authMiddleware, controller.payment);
router.get('/confirm', authMiddleware, controller.confirm);
router.get('/order-success', authMiddleware, controller.notifySuccess);
router.get('/order-fail', authMiddleware, controller.notifyFailure);
//POST
router.post('/payment', controller.postPayment);
router.post('/check-code', controller.checkCode);
router.post('/confirm', controller.postConfirm);

module.exports = router;
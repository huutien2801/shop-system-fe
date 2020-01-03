var express = require('express');
var router = express.Router();
var adminController = require("../controllers/admin.controller");

//GET
router.get('/category',adminController.manageCategory);
router.get('/product', adminController.manageProductGET);
router.get("/history", adminController.manageHistory);
router.get('/user', adminController.manageUser);
router.get('/order', adminController.manageOrder);
router.get('/charity', adminController.manageCharity);
router.get('/promotion', adminController.managePromotion);

//POST
router.post('/product', adminController.manageProductPOST);
router.post('/category',adminController.manageCategoryPOST);
router.post('/promotion', adminController.managePromotionPOST);
router.post('/charity', adminController.manageCharityPOST);
router.post('/user', adminController.manageUserPOST);

module.exports = router;
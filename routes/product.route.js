var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');
var authMiddleware = require("../middlewares/auth");


{var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });}

router.get('/', controller.index);
router.get('/detail/:id&:catId',controller.detail);
router.get('/archive/:catId', controller.archive);
router.get('/cart',controller.cart);
router.get('/cart/add/:proID',controller.addCart);
router.get('/cart/sub/:proID',controller.subCart);
router.get('/cart/remove/:proID',controller.remove);
router.get('/archive/:catID/:page',controller.pageByCat);
router.get('/archive/:catID/filter/:type', controller.filter);
router.get('/add', controller.add);
router.get('/update/:id', controller.update);
router.get('/', controller.index);
router.get('/delete/:id', controller.delete);
//POST
router.post('/detail/:id&:catId',authMiddleware,controller.postComment);
router.post('/add', upload.single('ProImg'), controller.postAdd);
router.post('/update/:id', controller.postUpdate);
router.post('/check-code', controller.checkCode);
module.exports = router;
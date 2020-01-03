var express = require("express")
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
var async = require('async');
var cookieParser = require('cookie-parser')
var app = express();
var morgan = require('morgan');
var flash = require('express-flash');
var flash = require('http-errors');

var catRoute = require('./routes/category.route')
var proRoute = require('./routes/product.route')
var promRoute = require('./routes/promotion.route')
var orderRoute = require('./routes/order.route')
var authRoute = require('./routes/auth.route')
var indexRoute = require('./routes/index.route')
var pageRoute = require('./routes/page.route')
var adminRoute = require('./routes/admin.route')

app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('asfcbxjhcbjzh'));
app.use(express.static(__dirname + "/public"));

require('./middlewares/view-engine')(app);
require('./middlewares/helpers')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);
require('./middlewares/passport-facebook')(app);
// require('./middlewares/upload-img')(app);

var authAdmin = require('./middlewares/auth-admin')
app.use(require('./middlewares/auth.local.mdw'));
app.use(require('./middlewares/session.mdw'));
var port = 3000;


app.use('/', indexRoute);
app.use('/category', authAdmin, catRoute);
app.use('/product',proRoute);
app.use('/promotion', authAdmin, promRoute);
app.use('/order', orderRoute);
app.use('/auth',authRoute);
app.use('/page',pageRoute);
app.use('/admin',adminRoute);

// If error occured
app.use((req, res, next) => {
	next(createError(404));
})
app.use((err, req, res, next) => {
	var status = err.status || 500;
	var errorView = 'error';
	if (status === 404)
		errorView = '404';
	var msg = err.message;
	var error = err;
	res.status(status).render(errorView, {
		layout: false,
		msg,
		error
	})
})
app.listen(port, function(){
	console.log("Hello world on port 3000!")	
});
var cartDB = require('../models/cart');
var receiverDB = require('../models/receiver');
var orderDB = require('../models/order');
var promotionDB = require('../models/promotion');
var orderedProDB = require('../models/orderedproduct');
var moment = require('moment');
var cartDB = require("../models/cart");

module.exports.payment = function(req,res){
  var sessionID = req.signedCookies.sessionID;

  Promise.all([cartDB.loadBySession(sessionID)]).then(([cart]) => {
    let total = 0;
    cart.forEach(x => {
      total += parseInt(x.ProCurrentPrice)* parseInt(x.ProAmount);
    });
    res.render('orders/payment',{
      cart: cart,
      total: total
    });
  })
}

module.exports.postPayment = function(req,res){

  var sessionID = req.signedCookies.sessionID;
  let entity = {
    RecvName: req.body.name,
    RecvEmail: req.body.email,
    RecvAddress: req.body.address,
    RecvTeleNumbers: req.body.numbers
  }
  console.log(entity);
  receiverDB.add(entity).then(recvId => {
    var order = {
      CliId: req.user.CliId,
      SessionID: sessionID,
      Receiver: recvId
    }

    orderDB.add(order).then(id => {
      console.log(id + " order is added.");
    });
  })
  res.redirect('/order/confirm');
};

module.exports.confirm = function(req, res) {
  var sessionID = req.signedCookies.sessionID;

  cartDB.loadBySession(sessionID).then(cart => {
    let total = 0;
    cart.forEach(x => {
      total += parseInt(x.ProCurrentPrice) * parseInt(x.ProAmount);
    });
    console.log(cart);
    console.log(total);
    res.render("orders/confirm", {
      cartItems: cart,
      shippingFee: 20000,
      total: total
    });
  })
}

module.exports.postConfirm = function(req, res) {

  var sessionID = req.signedCookies.sessionID;
  console.log(req.body);
  let currDate = moment().format('YYYY-MM-DD hh:mm:ss');
  var order1 = {
    SessionID: sessionID,
    TotalCash: req.body.total,
    OrderTime: currDate
  }
  console.log(order1);
  orderDB.update(order1).then(n => {
    console.log(n + " order is updated.");
  });

  var orderID;
  orderDB.singleBySessionID(sessionID).then(rows => {
    orderID = rows[0].OrderId;
    console.log(orderID + " orderid");

    Promise.all([cartDB.loadBySession(sessionID)])
    .then(([cart]) => {
      console.log(cart[0] + " 123");
      cart.forEach(x => {
        let product = {
          OrderId: orderID,
          ProId: x.ProId,
          ProAmount: x.ProAmount
        }
        console.log(product + " 789")
        orderedProDB.add(product).then(proId => {
          console.log(proId + " ordered product is added.")
        })
      })
      cartDB.deleteBySessionID(sessionID).then(n => {
        console.log(n + " cart rows are deleted.")
      })
    })
    res.redirect("/");
  }).catch(err => {
    console.log(err);
    res.redirect("/");
  })
};

module.exports.checkCode = function(req, res, next) {
  var code = req.body.code;
  console.log(req.body + " abcn");

  promotionDB.singleByCode(code).then(promo => {
    if (promo.length > 0) {
      console.log(promo[0].Discount + ' discount');

      var totalPrice = parseInt(req.body.total);
      if (promo[0].Discount > 0) {
        totalPrice *= (1 - parseFloat(promo[0].Discount));
        // Làm tròn giá lên đơn vị trăm đồng
        console.log(Math.round(totalPrice / 100) * 100);
        req.cookies.total = totalPrice;
        console.log(req.cookies.total);         
      }
      res.json(totalPrice);
    }
  }).catch(err => {
    console.log(err);
    res.json(400);
  })
};

module.exports.notifySuccess = function(req, res, next) {
  res.render("order/noti-success");
};

module.exports.notifyFailure = function(req, res, next) {
  res.render("order/noti-failure");
};
var promotionDB = require("../models/promotion");
var moment = require('moment');

module.exports.index = function(req, res) {

    promotionDB.all().then(rows => {
        res.render("promotions/index", {
            list: rows
        });
    }).catch(err => {
        console.log(err);
    })
}

module.exports.add = function(req, res) {
    promotionDB.all().then(rows => {
        res.render("promotions/add", {
            category: rows
        });
    }).catch(err => {
        console.log(err);
    })
}

module.exports.postAdd = function(req, res) {
    var appliedTime = moment(req.body.AppliedTime, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');
    var expiredTime = moment(req.body.ExpiredTime, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');
    var entity = {
        PromCode: req.body.PromCode,
        Discount: req.body.Discount,
        MinCash: req.body.MinCash,
        AppliedTime: appliedTime,
        ExpiredTime: expiredTime
    }
    promotionDB.add(entity).then(id => {
        res.render("promotions/add");
    }).catch(err => {
        console.log(err);
    })
}

module.exports.update = function(req, res) {
    var id = req.params.id;
    promotionDB.single(id).then(rows => {
        console.log(rows[0]);
        res.render("promotions/update", {
            promotion: rows
        });
    }).catch(err => {
        console.log(err);
    });
}

module.exports.postUpdate = function(req, res) {
    var appliedTime = moment(req.body.AppliedTime).format('YYYY-MM-DD hh:mm:ss');
    var expiredTime = moment(req.body.ExpiredTime).format('YYYY-MM-DD hh:mm:ss');
    var entity = {
        PromId: req.params.id,
        PromCode: req.body.PromCode,
        Discount: req.body.Discount,
        MinCash: req.body.MinCash,
        AppliedTime: appliedTime,
        ExpiredTime: expiredTime
    }
    promotionDB.update(entity).then(id => {
        res.redirect("/promotion");
    }).catch(err => {
        console.log(err);
    })
}

module.exports.delete = function(req, res) {
    var id = req.params.id;
    if (id > 0) {
        promotionDB.delete(id).then(n => {
            console.log("Deleted " + n + "promotion code")
        })
        .catch(err => {
            console.log(err);
        })
    }
    res.redirect('/promotion');
};
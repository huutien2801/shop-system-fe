var categoryDB = require("../models/category");

module.exports.index = function(req,res){
    var listCategory = categoryDB.all();
    listCategory.then(rows => {
        res.render("categories/index", {
            list : rows
        });
    }).catch(err => {
        console.log(err);
    })
};

module.exports.add = function(req,res) {
    res.render("categories/add");
};

module.exports.addPost = function(req,res) {
    var entity = {
        CatName: req.body.CatName
    }

    categoryDB.add(entity).then(id => {
        res.render("categories/add");
    }).catch(err => {
        console.log(err);
    })
};

module.exports.update = function(req, res) {
    var id = req.params.id;
    categoryDB.single(id).then(rows => {
        res.render("categories/update", {
            category: rows
        });
    }).catch(err => {
        console.log(err);
    });
}

module.exports.postUpdate = function(req, res) {
    var entity = {
        CatId: req.params.id,
        CatName: req.body.CatName
    }

    categoryDB.update(entity).then(id => {
        res.redirect("/category");
    }).catch(err => {
        console.log(err);
    })
}

module.exports.delete = function(req, res) {
    var id = req.params.id;
    if (id > 0) {
        categoryDB.delete(id).then(n => {
            console.log("Deleted " + n + "category")
        })
        .catch(err => {
            console.log(err);
        })
    }
    res.redirect('/category');
};
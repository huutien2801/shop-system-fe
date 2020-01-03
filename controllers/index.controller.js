var productDB = require('../models/product');
var catDB = require('../models/category');
var cartDB = require('../models/cart');

module.exports.home = function(req,res){
    res.render("home", {
    });
};

module.exports.admin = function(req,res){
    res.render('admin');
};

module.exports.page = function(req,res){

    // let page = req.params.page;
    // let perPage = 5;
    // let proPerPage = perPage * (page-1);
    
    // productDB.page(perPage,proPerPage).then(rows => {
    //     res.render('pagination/page',{
    //         allProduct: rows
    //     });
    // }).catch(err => {
    //     console.log(err);
    // })
}

module.exports.search = function(req,res){

    // let textSearch = req.body.data;

    // if (textSearch == '')
    // {
    //     productDB.all().then(rows => {
    //         res.render('pagination/pageSearch',{
    //             allProduct: rows.slice(0,5)
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }else {
      
    //      productDB.searchProductByName(textSearch).then(rows => {
    //         res.render('pagination/pageSearch',{
    //             allProduct: rows
    //         });
    //     }).catch(err => {
    //             console.log(err);
    //     })
    // }

}
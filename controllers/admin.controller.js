const request = require('request');
var moment = require('moment');

module.exports.manageProductGET = function (req, res) {
    let listCategory = []
    request('https://shop-system-api.herokuapp.com/categories', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
      
        listCategory = response.body.data
        // console.log(listCategory)
        request('https://shop-system-api.herokuapp.com/products', { json: true }, (err, response, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(listCategory)
            res.render("admin/product", {
                listProduct: response.body.data,
                listCategory: listCategory
            });
        });
    });
};

module.exports.manageProductPOST = function (req, res) {

    let arrSize = []
    arrSize.push(req.body.size)
    let imageArray = []
    imageArray.push(req.body.image)
    let colorArray = []
    colorArray.push(req.body.colorName)
    let colorCodeArray = []
    colorCodeArray.push(req.body.colorCode)

    request.post('https://shop-system-api.herokuapp.com/products', {
        json: {
            name: req.body.name,
            price: parseInt(req.body.price),
            quantity: parseInt(req.body.quantity),
            size: req.body.size,
            categoryName: req.body.categoryName,
            imageArray: imageArray,
            material: req.body.material,
            colorName: colorArray,
            colorCode: colorCodeArray,
            description: req.body.description,
            discount:  parseInt(req.body.discount)
        }
    }, (error, response, body) => {
        if (error) {
            return
        }
        res.redirect('/admin/product');
    })
};

module.exports.manageCategory = function (req, res) {
    request('https://shop-system-api.herokuapp.com/categories', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
      
        let listCategory = response.body.data
        // console.log(listCategory)
        res.render("admin/category", {
            listCategory
        });
    });
};

module.exports.manageCategoryPOST = function (req, res) {
    request.post('https://shop-system-api.herokuapp.com/categories', {
        json: {
            name: req.body.name,
        }
    }, (error, response, body) => {
        if (error) {
            return
        }
        res.redirect('/admin/category');
    })
};

module.exports.manageCharity = function (req, res) {
    request('https://shop-system-api.herokuapp.com/charity', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        let listCharity = []
        if(response.body.data){
            listCharity = response.body.data
            listCharity.forEach(element => {
                element.startTime = moment(element.startTime).format("DD-MM-YYYY")
                element.finishTime = moment(element.finishTime).format("DD-MM-YYYY")
            });
        }
        
        // console.log(listCategory)
        res.render("admin/charity", {
            listCharity
        });
    });
};

module.exports.manageCharityPOST = function (req, res) {
    let status = ""
    let currentDate = new Date()
    let startDate = new Date(req.body.startDate)
    let endDate = new Date(req.body.endDate)

    if(startDate > currentDate){
        status = "INACTIVE"
    }else if(currentDate > startDate && currentDate <= endDate){
        status = "ACTIVE"
    }
   
    request.post('https://shop-system-api.herokuapp.com/charity', {
        json: {
            charityName: req.body.name,
            charityCode: req.body.code,
            target: parseInt( req.body.target),
            startTime: startDate.toISOString(),
            finishTime: endDate.toISOString(),
            address: req.body.address,
            status: status
        }
    }, (error, response, body) => {
        if (error) {
            return
        }
        res.redirect("/admin/charity")
    })
};

module.exports.manageOrder = function (req, res) {
    request('https://shop-system-api.herokuapp.com/order', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        let listOrder = []
        if(response.body.data){
            listOrder = response.body.data
            listOrder.forEach(element => {
                element.deliverTime = moment(element.deliverTime).format("DD-MM-YYYY")
                element.createdTime = moment(element.createdTime).format("DD-MM-YYYY")
            });
        }
        
        res.render("admin/order", {
            listOrder
        });
    });
};
module.exports.manageHistory = function (req, res) {
    request('https://shop-system-api.herokuapp.com/history', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        let listHistory = []
        if(response.body.data){
            listHistory = response.body.data
            listHistory.forEach(element => {
                element.pickTime = moment(element.pickTime).format("DD-MM-YYYY")
                element.deliverTime = moment(element.deliverTime).format("DD-MM-YYYY")
            });
        }
        
        res.render("admin/history", {
            listHistory
        });
    });
};
module.exports.managePromotion = function (req, res) {
    request('https://shop-system-api.herokuapp.com/promotion', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        let listPromotion = []
        if(response.body.data){
            listPromotion = response.body.data
            listPromotion.forEach(element => {
                element.startTime = moment(element.startTime).format("DD-MM-YYYY")
                element.finishTime = moment(element.finishTime).format("DD-MM-YYYY")
            });
        }
        
        res.render("admin/promotion", {
            listPromotion
        });
    });
};
module.exports.managePromotionPOST = function (req, res) {
   
    let status = ""
    let currentDate = new Date()
    let startDate = new Date(req.body.startDate)
    let endDate = new Date(req.body.endDate)

    if(startDate > currentDate){
        status = "INACTIVE"
    }else if(currentDate > startDate && currentDate <= endDate){
        status = "ACTIVE"
    }
   
    request.post('https://shop-system-api.herokuapp.com/promotion', {
        json: {
            promotionName: req.body.name,
            promotionCode: req.body.code,
            startTime: startDate.toISOString(),
            finishTime: endDate.toISOString(),
            valueDiscount: parseInt(req.body.value),
            status: status
        }
    }, (error, response, body) => {
        if (error) {
            return
        }
        res.redirect("/admin/promotion")
    })
 
};
module.exports.manageUser = function (req, res) {
    request('https://shop-system-api.herokuapp.com/user', { json: true }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        let listUser = []
        if(response.body.data){
            listUser = response.body.data
            listUser.forEach(element => {
                element.dateOfBirth = moment(element.dateOfBirth).format("DD-MM-YYYY")
                element.addressStr = element.address.address + " "+ element.address.district + " "+ element.address.province
            });
        }
        
        res.render("admin/user", {
            listUser
        });
    });
};

module.exports.manageUserPOST = function (req, res) {
   console.log(req.body)
    let dateOfBirth = new Date(req.body.dateOfBirth)
   
    request.post('https://shop-system-api.herokuapp.com/user', {
        json: {
            username: req.body.username,
            password: req.body.password,
            dateOfBirth: dateOfBirth.toISOString(),
            phoneNumber: req.body.phoneNumber,
            fullName: req.body.fullName,
            email: req.body.email,
            userRole: req.body.userRole
        }
    }, (error, response, body) => {
        if (error) {
            return
        }
        res.redirect("/admin/user")
    })
};


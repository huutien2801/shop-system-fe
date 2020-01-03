var shortID = require('shortid');

module.exports = function(req,res,next) {
    if(!req.signedCookies.sessionID){
        res.cookie('sessionID', shortID.generate() , {
            signed: true
        });
    }
    next();
}
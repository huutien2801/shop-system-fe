var numeral = require('numeral');
var moment = require('moment');

module.exports = function (app) {
    app.locals.formatPrice = function(val) {
    	return numeral(val).format(0, 0);
    },
    app.locals.formatDate = function(val) {
    	return moment(val).format("DD/MM/YYYY hh:mm:ss");
    }
}
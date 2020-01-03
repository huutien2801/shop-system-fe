var db = require("../common/db");

module.exports = {
	all: () => {
		return db.load('select * from promotions');
	},
	singleByID: id => {
		return db.load(`SELECT * FROM promotions WHERE PromId = ${id}`);
	},
	singleByCode: code => {
		return db.load(`SELECT * FROM promotions WHERE PromCode = '${code}'`);
	},
	add: entity => {
		return db.add('promotions', entity);
	},
	update: entity => {
		return db.update('promotions', 'PromId', entity);
	},
	delete: id => {
		return db.delete('promotions', 'PromId', id);
	},
}
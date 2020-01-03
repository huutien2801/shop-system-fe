var db = require("../common/db");

module.exports = {
	all: () => {
		return db.load('select * from orderedproducts');
	},
	single: id => {
		return db.load(`SELECT * FROM orderedproducts WHERE OrderId = ${id}`);
	},
	add: entity => {
		return db.add('orderedproducts', entity);
	},
	delete: id => {
		return db.delete('orderedproducts', 'OrderId', id);
	},
}
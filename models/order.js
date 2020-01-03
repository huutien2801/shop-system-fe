var db = require("../common/db");

module.exports = {
	all: () => {
		return db.load('select * from orders');
	},
	single: id => {
		return db.load(`SELECT * FROM orders WHERE OrderId = ${id}`);
	},
	singleBySessionID: sessionID => {
		return db.load(`SELECT * FROM orders WHERE SessionID = '${sessionID}' ORDER BY OrderId DESC LIMIT 1`);
	},
	add: entity => {
		return db.add('orders', entity);
	},
	update: entity => {
		return db.update('orders', 'SessionID', entity);
	},
	updateBySessionID: entity => {
		return db.load(`UPDATE orders SET ${entity} WHERE SessionID = '${entity.SessionID}'`);
	},
	delete: id => {
		return db.delete('orders', 'OrderId', id);
	},
}
var db = require("../common/db");

module.exports = {
	all: () => {
		return db.load('select * from receivers');
	},
	single: id => {
		return db.load(`SELECT * FROM receivers WHERE RecvId = ${id}`);
	},
	add: entity => {
		return db.add('receivers', entity);
	},
	update: entity => {
		return db.update('receivers', 'RecvId', entity);
	},
	delete: id => {
		return db.delete('receivers', 'RecvId', id);
	},
}
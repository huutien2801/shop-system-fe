var db = require("../common/db");

module.exports = {
    add: entity => {
        return db.add('carts',entity);
    },
    update: (sessionId,proId,proAmount) => {
        return db.load(`UPDATE carts SET ProAmount = ${proAmount} 
        WHERE SessionID = "${sessionId}"
        AND ProId = ${proId}`);
    },
    find: (sesionId,proId) => {
        return db.load(`SELECT * FROM carts 
        WHERE SessionID = "${sesionId}"
        AND ProId = ${proId}`);
    },
    loadBySession: (sessionId) => {
        return db.load(`SELECT * 
        FROM carts, products
        WHERE SessionID = '${sessionId}' AND products.ProId = carts.ProId`);
    },
    delete: (sessionId,proId) => {
        return db.load(`DELETE FROM carts
         WHERE SessionID = '${sessionId}' 
         AND ProId = ${proId}`);
    },
    deleteBySessionID: sessionId => {
        return db.load(`DELETE FROM carts
         WHERE SessionID = '${sessionId}'`);
    },
    remove: (proId) => {
        return db.delete('carts','ProId',proId);
    }
}
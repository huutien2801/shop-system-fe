var db = require("../common/db");

module.exports = {
    all: () => {
        return db.load('select * from products');
    },
    newProduct: () => {
        return db.load('SELECT * FROM products ORDER BY PublishedDate DESC LIMIT 6');
    },
    topSellProduct: () => {
        return db.load('SELECT * FROM products ORDER BY Sold DESC LIMIT 10');
    },
    single: id => {
        return db.load(`SELECT * FROM products WHERE ProId = ${id}`);
    },
    getSameCatProduct: CatId => {
        return db.load(`SELECT * FROM products WHERE ProCat = ${CatId} LIMIT 6`);
    },
    page: (page,offset)=> {
        return db.load(`SELECT * FROM products 
            limit ${page} 
            offset ${offset}`);
    },
    pageByCate: (catID, limit ,offset ) => {
        return db.load(`SELECT * FROM products 
            WHERE ProCat = ${catID} 
            LIMIT ${limit} 
            offset ${offset}`);
    },
    getNumberOfProductByCate: (catID) => {
        return db.load(`SELECT COUNT(ProId) as count
            FROM products
            WHERE ProCat = ${catID}
            GROUP BY ProCat`)
    },
    searchProductByName: (textSearch) => {
        return db.load(`SELECT * FROM products WHERE MATCH(ProName) against('${textSearch}')`);
    },
    filterProductByPrice: (catID) => {
        return db.load(`SELECT * FROM products
            WHERE ProCat = ${catID} 
            ORDER by ProCurrentPrice DESC
            LIMIT 6`);
    },
    add: entity => {
        return db.add('products', entity);
    },

    update: entity => {
        return db.update('products', 'ProId', entity);
    },

    delete: id => {
        return db.delete('products', 'ProId', id);
    },

    totalCartPrice: SessionID => {
        return db.load(`SELECT SUM(p.ProCurrentPrice * c.ProAmount) AS Total
                        FROM carts c INNER JOIN (SELECT ProCurrentPrice, ProId
                                                FROM products ) AS p
                        ON SessionID = '${SessionID}' AND c.ProId = p.ProId`)
    }
}
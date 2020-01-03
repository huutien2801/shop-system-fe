var mysql = require('mysql');

var createConnection = () =>{
    return mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'bookshop',
        port: "3306"
      });
}

module.exports = {
    load: sql => {
       return new Promise((resolve,reject) => {
        var connection = createConnection();
        connection.connect();
        connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error);
            }
            else{
                resolve(results);
            }
            connection.end();
          });
       });
    },
    add: (tableName,entity) => {
        return new Promise((resolve,reject) => {
            var sql = `insert into ${tableName} set ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql,entity ,function (error, value) {
                if (error) {
                    reject(error);
                }
                else{
                    resolve(value.insertId);
                }
                connection.end();
              });
           });
    },
    update: (tableName,idField,entity) => {
        return new Promise((resolve,reject) => {
            var id = entity[idField];
            delete entity[idField];

            var sql = `update ${tableName} set ? where ${idField} = ?`;
            var connection = createConnection();
            connection.connect();

            connection.query(sql,[entity,id],(error,value) => {
                if(error){
                    reject(err);     
                } else{
                    resolve(value.changedRow);
                }
                connection.end();
            })
        });
    },
    delete: (tableName, idField, id) => {
        return new Promise( (resolve,reject) => {
            var sql = `delete from ${tableName} where ${idField} = ?`;
            var connection = createConnection();   
            connection.connect();

            connection.query(sql, id, (error,value) => {
                if(error){
                    reject(err);
                }else {
                    resolve(value);
                }
                connection.end();
            })
        })
    }
}  

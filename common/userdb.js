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
    add: (entity) => {
        return new Promise((resolve,reject) => {
            var sql = 'insert into user set ?';
            var connection = createConnection();
            connection.connect();
            connection.query(sql,entity,function (error, value) {
                if (error) {
                    reject(error);
                }
                else{
                    resolve(value.insertId);
                }
                connection.end();
              });
           });
    }
}  

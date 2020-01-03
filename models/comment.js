var db = require('../common/db');

module.exports = {
    load: (proId) =>{
        return db.load(`SELECT com.*,cli.CliName
        FROM comments as com, clients as cli 
        WHERE com.CliId = cli.CliId AND com.ProId = ${proId}`);
    },
    add: (entity) => {
        return db.add('comments',entity);
    }
}
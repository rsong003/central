const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'taskmon'
});

db.connect((err, res) => {
    if(err) {
        console.log('cant connect');
    } else {
        console.log('connected to db');
    }
});

module.exports = db;

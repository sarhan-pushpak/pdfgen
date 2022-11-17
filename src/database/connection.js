const mysql = require('mysql2');

// MySQL Cridentials
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "passwd",
    database: 'data', 
    multipleStatements: true
});
// Connection:
con.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log("DB connected successfully");
    }
})
module.exports = con;
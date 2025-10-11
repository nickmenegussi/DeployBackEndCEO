const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: parseInt(process.env.MYSQL_ADDON_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10,
});

pool.getConnection((err) => {
    if(err){
        throw err
    } else {
        console.log('Banco conectado')
    }
})

module.exports = pool
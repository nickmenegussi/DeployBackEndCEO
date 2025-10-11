const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: parseInt(process.env.MYSQL_ADDON_PORT),
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 10,
  waitForConnections: true, // Coloca na fila se todas ocupadas
  queueLimit: 20,          // Até 20 requisições na fila
  acquireTimeout: 10000
});

pool.getConnection((err) => {
    if(err){
        throw err
    } else {
        console.log('MySQL Pool configurado - connectionLimit: 3');
        console.log('Banco conectado')
    }
})

module.exports = pool
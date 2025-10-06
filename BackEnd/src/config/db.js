const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
})
console.log("HOST:", process.env.MYSQL_ADDON_HOST);
console.log("User:", process.env.MYSQL_ADDON_USER);

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log('Banco conectado')
    }
})

module.exports = connection
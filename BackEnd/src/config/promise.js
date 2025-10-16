const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: parseInt(process.env.MYSQL_ADDON_PORT),
};

/**
 * Função assíncrona para obter uma nova conexão.
 * Cada chamada a esta função tentará estabelecer uma nova conexão.
 * @returns {Promise<mysql.Connection>} A conexão MySQL.
 */

async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    console.log("Nova conexão MySQL estabelecida.")
    return connection
  } catch (err) {
    console.error("Erro ao estabelecer conexão MySQL:", err);
    throw err;
  }
}
module.exports = getConnection;

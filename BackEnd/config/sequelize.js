// Utilziando essa abordagem de DTO para que em js puro possa ter ORM.
// 'importando as tabelas do bd para classes' 
import chalk from "chalk";
import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.MYSQL_ADDON_DB,
    process.env.MYSQL_ADDON_USER,
    process.env.MYSQL_ADDON_PASSWORD,
    {
        host: process.env.MYSQL_ADDON_HOST,
        dialect: "mysql",
        dialectModule: mysql2, // Necessário para Vercel encontrar o driver
        logging: false,
        port: Number(process.env.MYSQL_ADDON_PORT) || 3306,
        // Configurações críticas para Vercel/Serverless
        pool: {
            max: 5,         // Limite máximo de conexões por instância
            min: 0,         // Permite que o pool chegue a 0
            acquire: 30000, // Tempo máximo para tentar conectar
            idle: 10000     // Fecha a conexão após 10 segundos de inatividade
        },
        dialectOptions: {
            connectTimeout: 60000 // Timeout alto para conexões instáveis
        }
    }
)

export async function connectedDataBase() {
    try {
        await sequelize.authenticate()
        console.log(chalk.green("Banco de dados Conectado com sucesso!"))
    } catch (error) {
        console.error(chalk.red("❌ Erro ao conectar no banco de dados:", error));
    }
}

export default sequelize;
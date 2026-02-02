// Utilziando essa abordagem de DTO para que em js puro possa ter ORM.
// 'importando as tabelas do bd para classes' 
import chalk from "chalk";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    { 
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
        port: Number(process.env.DB_PORT)
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
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default {
    development: {
        username: process.env.MYSQL_ADDON_USER || process.env.DB_USER,
        password: process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASS,
        database: process.env.MYSQL_ADDON_DB || process.env.DB_NAME,
        host: process.env.MYSQL_ADDON_HOST || process.env.HOST,
        dialect: 'mysql',
        port: process.env.MYSQL_ADDON_PORT || process.env.DB_PORT
    },
    test: {
        username: process.env.MYSQL_ADDON_USER || process.env.DB_USER,
        password: process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASS,
        database: process.env.MYSQL_ADDON_DB || process.env.DB_NAME,
        host: process.env.MYSQL_ADDON_HOST || process.env.HOST,
        dialect: 'mysql',
        port: process.env.MYSQL_ADDON_PORT || process.env.DB_PORT
    },
    production: {
        username: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,
        host: process.env.MYSQL_ADDON_HOST,
        dialect: 'mysql',
        port: process.env.MYSQL_ADDON_PORT
    }
};

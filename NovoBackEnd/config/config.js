import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export default {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST || 'test_db',
        host: process.env.HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'mysql'
    }
};

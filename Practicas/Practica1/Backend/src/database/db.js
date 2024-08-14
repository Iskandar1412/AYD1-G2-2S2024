// npm i mysql2 path fs dotenv
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// Charge variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Config Database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Conexión establecida con la base de datos');
        connection.release();
    })
    .catch(error => {
        console.error('Error en la conexión con la base de datos:', error)
    }
);

module.exports = pool;
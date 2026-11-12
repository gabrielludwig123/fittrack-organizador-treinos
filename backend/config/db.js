
const mysql = require('mysql2/promise');
const path = require('path');
const dotenv = require('dotenv');

// Carrega o .env da pasta backend
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  override: true
});

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'fittrack',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = db;

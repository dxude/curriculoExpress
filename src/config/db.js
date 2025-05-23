const { Pool } = require('pg');
const path = require('path'); // Importe o módulo 'path'

// Este é o caminho mais robusto para o .env
// Ele tenta encontrar a raiz do projeto a partir de onde db.js está.
// db.js está em src/config/db.js
// Então, de src/config, precisamos ir ../.. para a raiz, e então para .env
const envPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: envPath });

console.log('Caminho do .env usado:', envPath); // Para depuração
console.log('DATABASE_URL carregada em db.js:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;
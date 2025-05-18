// src/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'CURRICULOEX',
  password: '123456db',
  port: 5432, // Porta padrão do PostgreSQL
});

// Teste a conexão ao iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  } else {
    console.log('Conexão com PostgreSQL estabelecida!');
    release(); // Libera o cliente de volta para o pool
  }
});

module.exports = pool;
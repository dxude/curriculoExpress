
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'CURRICULOEX',
  password: '123456db',
  port: 5432,
});


pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err.stack);
  } else {
    console.log('Conexão com PostgreSQL estabelecida!');
    release(); 
  }
});

module.exports = pool;
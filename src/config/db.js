const { Pool } = require('pg');
const path = require('path');

// Para produção (Vercel), process.env.DATABASE_URL já deve estar disponível
// Não precisa de dotenv.config() aqui para o ambiente Vercel.
// O dotenv.config() é mais para o ambiente de desenvolvimento local.

console.log('Vercel DATABASE_URL (dentro de db.js):', process.env.DATABASE_URL ? 'Loaded' : 'Undefined'); // Verifica se está carregada
// Para depuração, você pode até printar a URL completa (mas cuidado com senhas em logs públicos)
// console.log('Vercel DATABASE_URL (completa):', process.env.DATABASE_URL);


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

// Teste de conexão (no db.js ou server.js)
pool.query('SELECT 1')
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso no Vercel!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados no Vercel:', err.message));


module.exports = pool;
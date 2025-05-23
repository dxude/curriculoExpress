const app = require('./app');
const pool = require('./config/db'); // Importa a conexão com o banco de dados

const PORT = process.env.PORT || 3000;

console.log('1. Iniciando processo de conexão com o banco de dados...');

pool.query('SELECT 1')
  .then(() => {
    console.log('2. Conexão com o banco de dados estabelecida com sucesso no Vercel!');

    app.listen(PORT, () => {
      console.log(`3. Servidor Express rodando e escutando na porta ${PORT}`);
      // Este log indica que app.listen foi chamado e a callback executada.
      // Agora o servidor está "pronto" para aceitar requisições.
    });
  })
  .catch(err => {
    console.error('ERRO FATAL: Erro ao conectar ao banco de dados no Vercel:', err.message);
    process.exit(1); // Encerra o processo se a conexão com o DB falhar
  });

// Adicione um log no app.js também para ver a sequência
// src/app.js
// ...
// console.log('App Express configurado.');
// module.exports = app;
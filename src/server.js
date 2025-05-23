const app = require('./app');
const pool = require('./config/db'); 

const PORT = process.env.PORT || 3000;


pool.query('SELECT 1')
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso no Vercel!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro fatal ao conectar ao banco de dados no Vercel, encerrando app:', err.message);
    process.exit(1); 
  });
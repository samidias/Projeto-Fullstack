const express = require('express');
const cors = require('cors');
const ProdutoController = require('./controllers/ProdutoController');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite receber dados em JSON

// Rotas de Produtos
app.post('/produtos', ProdutoController.criar);
app.get('/produtos', ProdutoController.listar);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
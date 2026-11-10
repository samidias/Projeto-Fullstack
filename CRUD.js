const db = require('../database');

const ProdutoController = {
    // Criar um novo produto (CREATE)
    criar: (req, res) => {
        const { nome, descricao, preco, codigo_barras } = req.body;
        const sql = `INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)`;
        
        db.run(sql, [nome, descricao, preco, codigo_barras], function(err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ id: this.lastID, mensagem: 'Produto criado com sucesso!' });
        });
    },

    // Listar todos os produtos (READ)
    listar: (req, res) => {
        const sql = `SELECT * FROM produtos`;
        db.all(sql, [], (err, rows) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(200).json(rows);
        });
    }
};

module.exports = ProdutoController;
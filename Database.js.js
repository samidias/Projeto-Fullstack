const sqlite3 = require('sqlite3').verbose();

// Cria ou conecta ao banco de dados local
const db = new sqlite3.Database('./sistema.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas
db.serialize(() => {
    // Tabela de Produtos
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL,
        codigo_barras TEXT
    )`);

    // Tabela de Fornecedores
    db.run(`CREATE TABLE IF NOT EXISTS fornecedores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT UNIQUE,
        endereco TEXT,
        contato TEXT
    )`);

    // Tabela de Associação (Muitos para Muitos)
    db.run(`CREATE TABLE IF NOT EXISTS produto_fornecedor (
        produto_id INTEGER,
        fornecedor_id INTEGER,
        PRIMARY KEY (produto_id, fornecedor_id),
        FOREIGN KEY (produto_id) REFERENCES produtos (id),
        FOREIGN KEY (fornecedor_id) REFERENCES fornecedores (id)
    )`);
});

module.exports = db;
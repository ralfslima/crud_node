// Importar o Express
const express = require('express');

// Importar o MySQL2
const mysql2 = require('mysql2');

// CORS
const cors = require('cors');

// Configurar o acesso ao banco de dados
const conexao = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'api_node'
});

// App
const app = express();

// Habilitar o CORS
app.use(cors());

// Habilitar o uso de dados via parâmetro
app.use(express.json());

// Rota para listar
app.get('/', (req, res) => {
    
    // SQL
    const sql = 'SELECT * FROM produtos';

    // Acessar o banco de dados
    conexao.query(sql, (erro, resultado)=>{

        // Caso haja falhas no comando SQL
        if (erro) throw erro;

        // Retornar o resultado
        res.json(resultado);

    });

});

// Rota para cadastrar
app.post('/', (req, res) => {

    // SQL
    const sql = `INSERT INTO produtos (produto, valor) VALUES ('${req.body.produto}', ${req.body.valor})`;

    // Acessar o banco de dados
    conexao.query(sql, (erro, resultado) => {

         // Caso haja falhas no comando SQL
         if (erro) throw erro;

         // Obter o código gerado pelo banco de dados
         req.body.codigo = resultado.insertId;

         // Retornar o objeto produto
         res.json(req.body);

    });

});

// Rota para remover
app.delete('/:codigo', (req, res) => {

    // SQL
    const sql = `DELETE FROM produtos WHERE codigo = ${req.params.codigo}`;

     // Acessar o banco de dados
     conexao.query(sql, (erro, resultado) => {

        // Caso haja falhas no comando SQL
        if (erro) throw erro;

        // Retorno
        res.json({'mensagem':'Produto removido com sucesso!'});
     });

});

// Rota para cadastrar
app.put('/', (req, res) => {

    // SQL
    const sql = `UPDATE produtos SET 
    produto = '${req.body.produto}', 
    valor = ${req.body.valor} 
    WHERE codigo = ${req.body.codigo}`;

    // Acessar o banco de dados
    conexao.query(sql, (erro, resultado) => {

         // Caso haja falhas no comando SQL
         if (erro) throw erro;

         // Retornar o objeto produto
         res.json(req.body);

    });

});

// Servidor
app.listen(3000);
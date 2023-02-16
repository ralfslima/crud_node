// Vetor contendo os produtos
let produtos = [];

// Função para obter todos os produtos
const obterProdutos = () => {
    fetch('http://localhost:3000')
    .then(retorno => retorno.json())
    .then(retorno => produtos=retorno)
    .then(() => listar());
}

// Função para listar os produtos na tabela
const listar = () => {

    // Obter o tbody
    let tabela = document.getElementById('tabela');

    // Limpar produtos na tabela
    tabela.innerHTML = '';

    // Laço de repetição
    for(let i=0; i<produtos.length; i++){

        // Gerar uma nova linha de tabela
        let linha = tabela.insertRow(-1);

        // Gerar colunas
        let colunaCodigo = linha.insertCell(0);
        let colunaProduto = linha.insertCell(1);
        let colunaValor = linha.insertCell(2);
        let colunaSelecionar = linha.insertCell(3);

        // Adicionar os valores das colunas
        colunaCodigo.innerText = i+1;
        colunaProduto.innerText = produtos[i].produto;
        colunaValor.innerText = produtos[i].valor;
        colunaSelecionar.innerHTML = `<button class='btn btn-success' onclick='selecionarProduto(${i})'>Selecionar</button>`;

    }

}

// Função para cadastrar
const cadastrar = () => {

    // Obter o nome do produto e o valor
    let produto = document.getElementById("produto");
    let valor = document.getElementById("valor");

    // Objeto para envio da API
    let obj = {
        produto:produto.value,
        valor:parseFloat(valor.value)
    }

    // Requisição
    fetch('http://localhost:3000', {
        method:'post',
        body:JSON.stringify(obj),
        headers:{'Content-type':'application/json'}
    })
    .then(retorno => retorno.json())
    .then(retorno => produtos.push(retorno))
    .then(() => {
        // Atualizar tabela
        listar();

        // Limpar campos
        produto.value = '';
        valor.value = '';

        // Cursor no campo produto
        produto.focus();
    })

}

// Função para selecionar o produto
const selecionarProduto = (posicaoVetor) => {
    
    // Adicionar dados nos inputs
    document.getElementById("codigo").value = produtos[posicaoVetor].codigo;
    document.getElementById("produto").value = produtos[posicaoVetor].produto;
    document.getElementById("valor").value = produtos[posicaoVetor].valor;

    // Visibilidade dos botões
    document.getElementById("btnCadastrar").style.display='none';
    document.getElementById("btnAlterar").style.display='inline-block';
    document.getElementById("btnRemover").style.display='inline-block';
    document.getElementById("btnCancelar").style.display='inline-block';
}

// Função para cancelar a alteração ou remoção
const cancelar = () => {
    // Limpar inputs
    document.getElementById("codigo").value = '';
    document.getElementById("produto").value = '';
    document.getElementById("valor").value = '';

    // Visibilidade dos botões
    document.getElementById("btnCadastrar").style.display='inline-block';
    document.getElementById("btnAlterar").style.display='none';
    document.getElementById("btnRemover").style.display='none';
    document.getElementById("btnCancelar").style.display='none';

    // Cursor no campo produto
    produto.focus();
}

// Função para remover o produto
const remover = () => {

    // Obter o código
    let codigo = document.getElementById('codigo').value;

    // Realizar requisição
    fetch(`http://localhost:3000/${codigo}`,{
        method:'delete',
        headers:{'Content-type':'application/json'}
    })
    .then(retorno => retorno.json())
    .then(retorno =>{

        // Remover do vetor de produtos
        produtos = produtos.filter(obj => {return obj.codigo != codigo});

        // Atualizar
        listar();

        // Mensagem
        alert(retorno.mensagem);

        // Cancelar
        cancelar();
    })

}

// Função para alterar
const alterar = () => {

    // Obter o nome do produto e o valor
    let codigo = document.getElementById("codigo");
    let produto = document.getElementById("produto");
    let valor = document.getElementById("valor");

    // Objeto para envio da API
    let obj = {
        codigo:parseInt(codigo.value),
        produto:produto.value,
        valor:parseFloat(valor.value)
    }

    // Requisição
    fetch('http://localhost:3000', {
        method:'put',
        body:JSON.stringify(obj),
        headers:{'Content-type':'application/json'}
    })
    .then(retorno => retorno.json())
    .then(retorno => {

        // Obter posição do vetor
        let posicaoVetor = produtos.findIndex(obj => {return obj.codigo == codigo.value});

        // Alterar dados do vetor
        produtos[posicaoVetor] = retorno;
    })
    .then(() => {
        // Atualizar tabela
        listar();

        // Limpar campos
        produto.value = '';
        valor.value = '';

        // Cursor no campo produto
        produto.focus();
    })

}

// Após carregar o HTML e o CSS
window.onload = () => {
    obterProdutos();
}

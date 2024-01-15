const express = require("express");
const router = express.Router();
const cors = require('cors') //aqui estou trazendo o pacote cor que permite consumir esta api no front-end

const conectaBancoDeDados = require('./bancoDeDados');
conectaBancoDeDados();

const Mulher = require('./mulherModel');
const app = express();
const porta = 3333;

app.use(express.json());
app.use(cors())

// Rota GET para mostrar todas as mulheres
app.get('/mulheres', mostraMulheres);

// Rota POST para criar uma nova mulher
app.post('/mulheres', criaMulher);

// Rota PATCH para corrigir informações de uma mulher específica
app.patch('/mulheres/:id', corrigeMulher);

// Rota DELETE para deletar uma mulher específica
app.delete('/mulheres/:id', deletaMulher);

// Função para corrigir mulher
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);

    if (!mulherEncontrada) {
      return response.status(404).json({ erro: 'Mulher não encontrada' });
    }

    // Atualizar propriedades conforme necessário
    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulherAtualizadaNoBancoDeDados);
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

// Função para deletar mulher
async function deletaMulher(request, response) {
  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ mensagem: 'Mulher deletada com sucesso!' });
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

// Função para mostrar todas as mulheres
async function mostraMulheres(request, response) {
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find();
    response.json(mulheresVindasDoBancoDeDados);
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

// Função para criar uma nova mulher
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  });
  try {
    const mulherCriada = await novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch (erro) {
    console.log(erro);
    response.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

// Função para mostrar a porta
function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

// Use diretamente a função app.post para configurar a rota POST /mulheres
app.post('/mulheres', criaMulher);

app.listen(porta, mostraPorta);

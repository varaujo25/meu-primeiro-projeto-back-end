const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraHora(requeste, response) {
    const data = new Date()
    const hora = data.toLocaleTimeString('pt-BR')
    response.send(`<h1>A hora local é: ${hora}</h1>`)
}

app.get('/hora', mostraHora)

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)
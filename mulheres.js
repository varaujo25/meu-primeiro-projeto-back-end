const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Vanessa Araujo',
        imagem: 'https://media.licdn.com/dms/image/D4E35AQEo0xfa2EeUCA/profile-framedphoto-shrink_200_200/0/1700600423586?e=1704283200&v=beta&t=dSzne5LEzK8ZColyxo66oc2I-2jXWMcNaKTv7ZuGPWQ',
        minibio:  'Empreendedora e Desenvolvedora'
    },
    {
        nome: 'Ines Araujo',
        imagem: 'https://media.licdn.com/dms/image/D4E35AQEo0xfa2EeUCA/profile-framedphoto-shrink_200_200/0/1700600423586?e=1704283200&v=beta&t=dSzne5LEzK8ZColyxo66oc2I-2jXWMcNaKTv7ZuGPWQ',
        minibio: 'Criação e Produção'
    }, 
    {
        nome: 'Mariana Araujo',
        imagem: 'https://media.licdn.com/dms/image/D4E35AQEo0xfa2EeUCA/profile-framedphoto-shrink_200_200/0/1700600423586?e=1704283200&v=beta&t=dSzne5LEzK8ZColyxo66oc2I-2jXWMcNaKTv7ZuGPWQ',
        minibio: 'Vendedora'
    }
]

function mostraMulheres(requeste, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)
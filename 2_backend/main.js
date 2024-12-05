// REST API

require("dotenv").config()
const cors = require('cors')
const express = require ('express')
const uniqueValidator = require('mongoose-unique-validator')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
app.use(express.json())
app.use(cors())

app.listen(3000, () => {
        try {
            db_connect()
            console.log("express app running on port 3000")
        } catch (error) {
            console.log("ERRO: ", error)
        }
    }
)

// chave mongoDb
const connect_string = process.env.CONNECT_DB

// funcao conexao mongo db
async function db_connect () {
    await
    mongoose.connect(connect_string)
}

// Schemas

// schema usuarios
const userSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})
userSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", userSchema)

// schema eventos

const eventSchema = mongoose.Schema({
    nome: {type: String, required: true,unique: true},
    desc: {type: String, required: true},
    imglink: {type: String, required: true}
})
const EventSocial = mongoose.model("Event", eventSchema)

const eventCorp = mongoose.Schema({
    nome: {type: String, required: true,unique: true},
    desc: {type: String, required: true},
    imglink: {type: String, required: true}
})
const EventCorporativo = mongoose.model("EventCorporativo", eventCorp)

// post para login de usuarios
app.post('/login', async (req,res)=> {
    const login = req.body.login
    const password = req.body.password

    const userValido = await Usuario.findOne({login: req.body.login})
    
    if(!userValido) {
        return res.status(401).json({mensagem: "Usuario invalido"})
    }
    
    const senhaValida = await bcrypt.compare(password, userValido.password)
    console.log(senhaValida)

    if (!senhaValida) {
        return res.status(409).json({mensagem: "Senha invalida"})
    }

    if (senhaValida===true) {
        return res.status(200).json({mensagem: "Login concluido"})
    }
    res.end()
})

// post para registro de usuarios
app.post('/signup', async (req,res)=> {
    try {
        const login = req.body.login
        const password = req.body.password
        const criptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({
            login: login,
            password: criptografada
        })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.end()
    } catch (err) {
        console.log("Error during signup: ", err)
        return res.status(500).send({mensagem: 'Erro de cadastro'})
    }
})

// post para adicionar eventos
app.post('/eventos-s', async (req,res)=> {
    try {
        const nome = req.body.nome
        const desc = req.body.desc
        const imagem = req.body.imglink
        
        const evento = new EventSocial({
            nome: nome,
            desc: desc,
            imglink: imagem
        })

        const respMongo = await evento.save()
        console.log(respMongo)
        res.end()
    } catch(err) {
        return res.status(500).json({ error: "Falha ao adicionar evento"})
    }
})

// get para pegar todos os eventos ativos e passados
app.get('/eventos-s', async (req,res)=> {
    try {
        const events = await EventSocial.find()
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar eventos'})
    }
})

app.post('/r-eventos-s', async (req,res) =>{
    const nome = req.body.nome
    try {
        const nomeEvento = await EventSocial.deleteOne({ "nome":nome })
        if(!nomeEvento) {
            return res.status(404).json({ error: "Evento nao encontrado"})
        }
        res.status(200).json({ message: "Evento deletado com sucesso"})

    } catch (err) {
        res.status(500).json({ error: "Erro ao remover evento"})
    }
})

app.post('/contato', async (req,res)=> {
    const nome = req.body.nome
    const email = req.body.email
    const mensagem = req.body.mensagem
    
    const mensagens = new Mensagem({
        nome: nome,
        email: email,
        mensagem: mensagem
    })

    const respMongo = await mensagens.save()
    console.log(respMongo)
    res.end()
});

app.get('/contato', async (req,res)=> {
    try {
        const mensagens = await Mensagem.find()
        res.status(200).json(mensagens)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar mensagens'})
    }
});

app.post('/eventos-c', async (req,res)=> {
    try {
        const nome = req.body.nome
        const desc = req.body.desc
        const imagem = req.body.imglink
        
        const evento = new EventCorporativo({
            nome: nome,
            desc: desc,
            imglink: imagem
        })

        const respMongo = await evento.save()
        console.log(respMongo)
        res.end()
    } catch(err) {
        return res.status(500).json({ error: "Falha ao adicionar evento"})
    }
})

app.get('/eventos-c', async (req,res)=> {
    try {
        const events = await EventCorporativo.find()
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar eventos'})
    }
})

app.post('/r-eventos-c', async (req,res)=> {
    const nome = req.body.nome
    try {
        const nomeEvento = await EventSocial.deleteOne({ "nome":nome })
        if(!nomeEvento) {
            return res.status(404).json({ error: "Evento nao encontrado"})
        }
        res.status(200).json({ message: "Evento deletado com sucesso"})

    } catch (err) {
        res.status(500).json({ error: "Erro ao remover evento"})
    }
})

app.put('/update-by-name', async (req, res) => {
    const nome = req.body.nome // Nome do documento a ser atualizado

    const novosDados = req.body.novosDados // Dados novos para substituir

    try {
        const resultado = await Exemplo.findOneAndUpdate(
            { nome: nome },    // Filtro pelo campo nome
            { $set: novosDados }, // Atualiza os campos especificados
            { new: true }       // Retorna o documento atualizado
        )
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar por nome', detalhes: error.message });
    }
})

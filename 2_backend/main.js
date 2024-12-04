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

// APP ONLINE

app.listen(3000, () => {
        try {
            db_connect()
            console.log("express app running at port 3000")
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

// SCHEMAS

// schema usuarios
const userSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
userSchema.plugin(uniqueValidator)
// criando modelo Usuario
const Usuario = mongoose.model("Usuario", userSchema)

// POST METODOS

// post para registro de usuario
app.post('/signup', async (req,res)=> {
    try {
        const login = req.body.login
        const password = req.body.password
        console.log({
            login,
            password
        })
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

app.post('/login', async (req,res)=> {
    const login = req.body.login
    const password = req.body.password

    const userValido = await Usuario.findOne({login: req.body.login})
    
    if(!userValido) {
        return res.status(401).json({mensagem: "Usuario invalido"})
    }
    
    const senhaValida = await bcrypt.compare(password, userValido.password)

    if (!senhaValida) {
        return res.status(401).json({mensagem: "Senha invalida"})
    }
    res.end()
})

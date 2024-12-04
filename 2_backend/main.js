// REST API

require("dotenv").config();
const cors = require('cors')
const express = require ('express')
// const uniqueValidator = require('mongoose-unique-validator')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())

app.listen(3000, () => {
        try {
            db_connect()
            console.log("App running")
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

// schema usuarios
const userSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: {type: String, required: true}
})
// userSchema.plugin(uniqueValidator)

// criando modelo
const user = mongoose.model("user", userSchema)

// post para registro de usuario
app.post('/signup', async (req,res)=> {
    const login = req.body.login
    const password = req.body.password
    const usuario = new Usuario({
        login: login,
        password: password
    })
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.end()
})

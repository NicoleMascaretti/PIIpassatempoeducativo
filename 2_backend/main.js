// REST API

require("dotenv").config();
const cors = require('cors')
const express = require ('express')
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
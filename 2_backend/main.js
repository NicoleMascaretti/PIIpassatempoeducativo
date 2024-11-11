// REST API

require("dotenv").config();
const express = require ('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

app.listen(3000, () => {
        try {
            db_connect()
            console.log("App running")
        } catch (error) {
            console.log("ERRO: ", error)
        }
    }
)

const connect_string = process.env.CONNECT_DB

async function db_connect () {
    await
    mongoose.connect(connect_string)
}

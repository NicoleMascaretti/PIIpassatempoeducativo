// REST API

const express = require('express');
const app = express();
const mongoose  = require('mongoose')
app.use(express.json());



app.listen(3000, () => {
    try {
    mongoDbConnect()
    console.log("Server  Online")
    } 
    catch (e){
        console.log("Erro:", e)
    }

})

const Filmes = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

async function mongoDbConnect(){
    mongoose.connect("mongodb+srv://gugsgod:123454321@cluster111.qppkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster111")
}

app.get('/filmes', (req, res) => {
    res.json(filmes);
});

app.get('/hey', (req,res) => {
    res.send('hey');
});

app.post("/filmes", (req,res) => {
    // pega dados do cliente
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;

    const filme = {titulo: titulo, sinopse: sinopse};

    filmes.push(filme);

    res.json(filmes);
});

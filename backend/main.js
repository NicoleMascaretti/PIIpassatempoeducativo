// REST API

const express = require('express');
const app = express();
const mongoose  = require('mongoose')
app.use(express.json());

app.get('/hey', (req,res) => {
    res.send('hey');
});

app.listen(3000, () => {
    try {
    mongoDbConnect()
    console.log("up and running")
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

let filmes = [
{
titulo: "Forrest Gump - O Contador de Histórias",
sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
},
{
titulo: "Um Sonho de Liberdade",
sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
}
];

app.get('/filmes', (req, res) => {
    res.json(filmes);
});

app.post("/filmes", (req,res) => {
    // pega dados do cliente
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;

    const filme = {titulo: titulo, sinopse: sinopse};

    filmes.push(filme);

    res.json(filmes);
});

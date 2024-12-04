async function cadastrarFilme() {
    //constrói a URL completa
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    //pega os inputs que contém os valores que o usuário digitou
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    //pega os valores digitados pelo usuário
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    //limpa os campos que o usuário digitou
    tituloInput.value = ""
    sinopseInput.value = ""
    //envia os dados ao servidor (back end)
    const filmes = (await axios.post(URLCompleta, {
        titulo,
        sinopse
    })).data
    //limpa a tabela para preenchê-la com a coleção nova, atualizada
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

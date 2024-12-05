const protocolo = "http://";
const url = "localhost:3000";
const endpoint = "/eventos-s";
const urlCompleta = `${protocolo}${url}${endpoint}`;

const atualizarEventos = async () => {
  try {
    const postData = (await axios.get(urlCompleta)).data;
    const container = document.querySelector('.d-flex.justify-content-center.gap-3');
    const btnRemover = document.getElementById('btn-remover');

    postData.forEach((item) => {
      const bloco = document.createElement('div');
      bloco.classList.add('elementos', 'p-3', 'rounded');
      bloco.innerHTML = `
        <button type="button" class="btn btn-adicionar border-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <p>${item.nome}</p>
        </button>
      `;

      bloco.querySelector('button').addEventListener('click', () => {
        document.getElementById('nome-projeto').value = item.nome;
        document.getElementById('descricao-projeto').value = item.desc || "Sem descrição disponível.";
        document.getElementById('img-link').value = item.imglink || "";
        document.getElementById('exampleModalLabel').textContent = "Alterar evento";
        btnRemover.style.display = "inline-block";
      });

      container.appendChild(bloco);
    });

    const botaoAdicionarEvento = document.querySelector('.btn-adicionar'); // Ajuste o seletor para o botão correto
    botaoAdicionarEvento.addEventListener('click', () => {
      document.getElementById('nome-projeto').value = "";
      document.getElementById('descricao-projeto').value = "";
      document.getElementById('img-link').value = "";
      document.getElementById('exampleModalLabel').textContent = "Adicionar evento";
      btnRemover.style.display = "none";
    });
  } catch (error) {
    console.error("Erro ao buscar ou renderizar os eventos:", error);
  }
};

// Executa a função
document.addEventListener('DOMContentLoaded', () => {
  atualizarEventos();
});

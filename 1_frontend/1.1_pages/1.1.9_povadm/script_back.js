const protocolo = "http://";
const url = "localhost:3000";
const endpoint = "/eventos";
const urlCompleta = `${protocolo}${url}${endpoint}`;

const atualizarEventos = async () => {
  try {
    const postData = (await axios.get(urlCompleta)).data;

    const container = document.querySelector('.d-flex.justify-content-center.gap-3');

    if (!container) {
      console.error("Container não encontrado. Verifique o seletor no HTML.");
      return;
    }

    // Adiciona os eventos ao container
    postData.forEach((item) => {
      const bloco = document.createElement('div');
      bloco.classList.add('elementos', 'p-3', 'rounded');

      // Cria o conteúdo do botão
      bloco.innerHTML = `
        <button type="button" class="btn btn-adicionar border-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <p>${item.nome}</p>
        </button>
      `;

      // Adiciona evento de clique para preencher os campos do modal
      bloco.querySelector('button').addEventListener('click', () => {
        // Atualiza os campos do modal com os dados do evento
        document.getElementById('nome-projeto').value = item.nome;
        document.getElementById('descricao-projeto').value = item.desc || "Sem descrição disponível.";
        document.getElementById('img-link').value = item.imglink || "";
        document.getElementById('exampleModalLabel').textContent = "Alterar evento";
      });

      // Adiciona o bloco ao container
      container.appendChild(bloco);
    });

    // Evento de clique para o botão "Adicionar Evento"
    const botaoAdicionarEvento = document.querySelector('.btn-adicionar'); // Ajuste o seletor para o botão correto
    botaoAdicionarEvento.addEventListener('click', () => {
      // Limpa os campos do modal
      document.getElementById('nome-projeto').value = "";
      document.getElementById('descricao-projeto').value = "";
      document.getElementById('img-link').value = "";
      document.getElementById('exampleModalLabel').textContent = "Adicionar evento";
    });
  } catch (error) {
    console.error("Erro ao buscar ou renderizar os eventos:", error);
  }
};

// Executa a função
document.addEventListener('DOMContentLoaded', () => {
  atualizarEventos();
});

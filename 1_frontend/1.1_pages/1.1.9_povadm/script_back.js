const protocolo = "http://";
const url = "localhost:3000";
const endpoint = "/eventos-s";
const urlCompleta = `${protocolo}${url}${endpoint}`;

const atualizarEventos = async () => {
  try {
    const postData = (await axios.get(urlCompleta)).data;
    const container = document.querySelector('#eventos-container');
    const btnRemover = document.getElementById('btn-remover');
    const btnConcluir = document.querySelector('.btn-primary');
    let eventoId = null;

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

        eventoId = item.id;
      });

      container.appendChild(bloco);
    });

    const botaoAdicionarEvento = document.querySelector('.btn-adicionar');
    botaoAdicionarEvento.addEventListener('click', () => {
      document.getElementById('nome-projeto').value = "";
      document.getElementById('descricao-projeto').value = "";
      document.getElementById('img-link').value = "";

      document.getElementById('exampleModalLabel').textContent = "Adicionar evento";
      btnRemover.style.display = "none";

      eventoId = null;
    });

    btnConcluir.addEventListener('click', async () => {
      const nome = document.getElementById('nome-projeto').value;
      const descricao = document.getElementById('descricao-projeto').value;
      const imglink = document.getElementById('img-link').value;

      if (!nome || !descricao || !imglink) {
        alert("Por favor, preencha todos os campos!");
        return;
      }

      try {
        if (eventoId) {
          await axios.put(`${urlCompleta}/${eventoId}`, { nome, desc: descricao, imglink });
          alert("Evento alterado com sucesso!");
        } else {
          await axios.post(urlCompleta, { nome, desc: descricao, imglink });
          alert("Evento adicionado com sucesso!");
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        container.innerHTML = "";
        atualizarEventos();
      } catch (error) {
        console.error("Erro ao salvar evento:", error);
        alert("Ocorreu um erro ao salvar o evento. Tente novamente.");
      }
    });

    btnRemover.addEventListener('click', async () => {
      const confirmar = confirm("Tem certeza que deseja remover este evento?");
      if (!confirmar) return;

      try {
        const nome = document.getElementById('nome-projeto').value;
        const data = {
          "nome": nome
        }
        console.log(nome);
        await axios.post("http://localhost:3000/r-eventos-s", data);
        alert("Evento removido com sucesso!");

        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        container.innerHTML = "";
        atualizarEventos();
      } catch (error) {
        console.error("Erro ao remover evento:", error);
        alert("Ocorreu um erro ao remover o evento. Tente novamente.");
      }
    });

  } catch (error) {
    console.error("Erro ao buscar ou renderizar os eventos:", error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  atualizarEventos();
});

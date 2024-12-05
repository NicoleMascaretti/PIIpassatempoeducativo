const protocolo = "http://";
const url = "localhost:3000";
const endpoint = "/eventos";
const urlCompleta = `${protocolo}${url}${endpoint}`;

const criarCards = async () => {
  try {
    const postData = (await axios.get(urlCompleta)).data;
    // Seleciona o container do carrossel
    const carouselInner = document.querySelector('.carousel-inner');

    let currentCarouselItem = null;
    let rowDiv = null;

    postData.forEach((item, index) => {
      // Cria uma nova div de carousel-item a cada três documentos
      if (index % 3 === 0) {
        currentCarouselItem = document.createElement('div');
        currentCarouselItem.classList.add('carousel-item');

        // Torna o primeiro item ativo
        if (index === 0) {
          currentCarouselItem.classList.add('active');
        }

        // Cria uma nova row para os cards dentro do item do carrossel
        rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'meu-container');
        currentCarouselItem.appendChild(rowDiv);
        carouselInner.appendChild(currentCarouselItem);
      }

      // Cria o card
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'border-0', 'h-100');

      cardDiv.innerHTML = `
          <img src="${item.imglink}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${item.nome}</h5>
            <p class="card-text">${item.desc}</p>
          </div>
      `;
      colDiv.appendChild(cardDiv);

      // Adiciona o card à row atual
      rowDiv.appendChild(colDiv);
    });
  } catch (error) {
    console.error("Erro ao buscar ou renderizar os dados:", error);
  }
};

criarCards();

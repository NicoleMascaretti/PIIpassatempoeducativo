const protocolo = "http://";
const url = "localhost:3000";
const endpoint = "/eventos";
const urlCompleta = `${protocolo}${url}${endpoint}`;

const criarCards = async () => {
  try {
    const postData = (await axios.get(urlCompleta)).data;
    const carouselInner = document.querySelector('.carousel-inner');

    let currentCarouselItem = null;
    let rowDiv = null;

    postData.forEach((item, index) => {
      if (index % 3 === 0) {
        currentCarouselItem = document.createElement('div');
        currentCarouselItem.classList.add('carousel-item');

        if (index === 0) {
          currentCarouselItem.classList.add('active');
        }

        rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'meu-container');
        currentCarouselItem.appendChild(rowDiv);
        carouselInner.appendChild(currentCarouselItem);
      }

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

      rowDiv.appendChild(colDiv);
    });
  } catch (error) {
    console.error("Erro ao buscar ou renderizar os dados:", error);
  }
};

criarCards();

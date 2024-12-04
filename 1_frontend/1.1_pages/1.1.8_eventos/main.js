const protocolo = "http://"
const url = "localhost:3000"
const endpoint = "/eventos"
const urlCompleta = `${protocolo}${url}${endpoint}`
// const data = (await axios.get(urlCompleta)).data 
const data = [
  {
    "nome": "nome1",
    "desc": "desc1"
  },
  {
    "nome": "nome2",
    "desc": "desc2"
  }
]
const container = document.querySelector('.card')
const postMethods = ()=>{
  data.map((postData)=>{
    const postElement = document.createElement('div')
  })
}

postMethods()





document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".cards");
  let maxHeight = 0;

  // Descubra a maior altura
  cards.forEach((card1) => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) maxHeight = cardHeight;
  });

  // Aplique a maior altura a todos os cards
  cards.forEach((card1) => {
      card.style.height = maxHeight + "px";
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  let maxHeight = 0;

  // Descubra a maior altura
  cards.forEach((card) => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) maxHeight = cardHeight;
  });

  // Aplique a maior altura a todos os cards
  cards.forEach((card) => {
      card.style.height = maxHeight + "px";
  });
});
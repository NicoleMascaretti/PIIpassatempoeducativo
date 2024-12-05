const protocolo = 'http://'
const baseURL = 'localhost:3000'
const contatoEndpoint = '/contato'

async function obterContato() {
  try {
    const response = await fetch(`${protocolo}${baseURL}${contatoEndpoint}`);
    if (!response.ok) {
      throw new Error('Erro ao obter dados do contato');
    }
    const data = await response.json();
    return data.map(contato => ({
      nome: contato.nome,
      email: contato.email,
      mensagem: contato.mensagem
    }));
  } catch (error) {
    console.error('Erro:', error);
  }
}


function remover() {
  const removeButtons = document.querySelectorAll('.remove-row');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.parentElement.remove();
    });
  });
}
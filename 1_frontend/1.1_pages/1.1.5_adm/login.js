// Função para alternar a visualização da senha
function togglePasswordVisibility(inputId, iconId) {
    const inputField = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (inputField.type === 'password') {
        inputField.type = 'text'; // Mostra a senha
        icon.classList.remove('fa-eye'); // Remove o ícone de "olho fechado"
        icon.classList.add('fa-eye-slash'); // Adiciona o ícone de "olho aberto"
    } else {
        inputField.type = 'password'; // Esconde a senha
        icon.classList.remove('fa-eye-slash'); // Remove o ícone de "olho aberto"
        icon.classList.add('fa-eye'); // Adiciona o ícone de "olho fechado"
    }
}

// Adiciona eventos de clique para os botões de "olho"
document.getElementById('toggle-senha').addEventListener('click', function () {
    togglePasswordVisibility('senha', 'icone-senha');
});
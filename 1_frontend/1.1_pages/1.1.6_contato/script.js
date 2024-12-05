async function enviarContato() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const contactData = {
        name: name,
        email: email,
        message: message
    };

    try {
        const response = await fetch('http://your-api-endpoint/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
        } else {
            alert('Erro ao enviar mensagem.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar mensagem.');
    }
}

// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     submitContactForm();
// });
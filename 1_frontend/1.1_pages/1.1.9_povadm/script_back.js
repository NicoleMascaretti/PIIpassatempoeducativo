const exampleModal = document.getElementById('exampleModal');
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const modalTitle = exampleModal.querySelector('.modal-title');
    const modalBodyInput = exampleModal.querySelector('.modal-body input');
    const title = button.getAttribute('data-bs-title');
    // Atualiza os campos do modal
    const modalLabelName = exampleModal.querySelector('#modal-label-name');
    const modalLabelDescription = exampleModal.querySelector('#modal-label-description');
    modalLabelName.textContent = "Nome do " + title + ":";
    modalLabelDescription.textContent = "Descrição do " + title + ':';
    modalTitle.textContent = `Adicionar ` + title;
  });
}
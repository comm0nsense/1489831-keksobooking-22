//Контейнер для сообщения
const modalContainer = document.querySelector('main');

//Темплейты сообщений
const successModalTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorModalTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

//Создем сообщение на основании темлейта
const newSuccessModal = successModalTemplate.cloneNode(true);
const newErrorModal = errorModalTemplate.cloneNode(true);

// const tryAgainButton = newErrorModal.querySelector('.error__button');

const showModal = (modal) => {
  const onModalEscKeydown = (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      closeModal();
    }
  };

  const closeModal = () => {
    modal.remove();
    modal.removeEventListener('click', closeModal);
    modal.removeEventListener('keydown', onModalEscKeydown);
  }

  modalContainer.append(modal);
  modal.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEscKeydown);
};

export { newSuccessModal, newErrorModal, showModal };

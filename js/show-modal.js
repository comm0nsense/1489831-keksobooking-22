const ESC_KEYDOWN = ['Escape', 'Esc'];

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


const showModal = (modal) => {
  const onModalEscKeydown = (evt) => {
    if (evt.key === (ESC_KEYDOWN[0] || ESC_KEYDOWN[1])) {
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

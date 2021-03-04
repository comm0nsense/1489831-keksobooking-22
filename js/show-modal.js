import { isEscEvent } from './util.js';
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
  modalContainer.append(modal);
  modal.addEventListener('click', onClick(modal));
  // window.addEventListener('keydown', onModalEscKeydown(modal) );
};


const onClick = (modal) => {
  return (evt) => {
    evt.preventDefault();
    closeModal(modal);
  }
};


const onModalEscKeydown = (modal) => {
  return (evt) => {

    if (isEscEvent) {
      evt.preventDefault();
      closeModal(modal);

    }
  }
};


const closeModal = (modal) => {
  modal.remove();
  // window.removeEventListener('keydown', onModalEscKeydown(modal));
  modal.removeEventListener('click', onClick(modal));
};


export { newSuccessModal, newErrorModal, showModal };

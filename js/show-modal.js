const ESC_KEYDOWN = ['Escape', 'Esc'];
const ALERT_SHOW_TIME = 5000;

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
    document.removeEventListener('keydown', onModalEscKeydown);
  }

  modalContainer.append(modal);
  modal.addEventListener('click', closeModal);
  document.addEventListener('keydown', onModalEscKeydown);
};

/**
 *
 * @param {*} message
 */

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { newSuccessModal, newErrorModal, showModal, showAlert };

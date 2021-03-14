const ESC_KEYDOWN = ['Escape', 'Esc'];
const ALERT_SHOW_TIME = 5000;


const modalContainer = document.querySelector('main');

const successModalTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorModalTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const newSuccessModal = successModalTemplate.cloneNode(true);
newSuccessModal.style.zIndex = '1000';
const newErrorModal = errorModalTemplate.cloneNode(true);
newErrorModal.style.zIndex = '1000';

const showModal = (modal) => {
  const onModalEscKeydown = (evt) => {

    if (evt.key === (ESC_KEYDOWN[0] || ESC_KEYDOWN[1])) {
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    modal.remove();
    modal.removeEventListener('click', onCloseModal);
    document.removeEventListener('keydown', onModalEscKeydown);
  }

  modalContainer.append(modal);
  modal.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onModalEscKeydown);
};

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

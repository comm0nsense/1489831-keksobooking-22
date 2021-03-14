const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const AVATAR_PREVIEW_SRC = 'img/muffin-grey.svg';

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoUpload = document.querySelector('.ad-form__photo');

const photoPreview = document.createElement('img');
photoPreview.style.display = 'flex';
photoPreview.style.maxWidth = '100%';
photoPreview.style.height = 'auto';
photoUpload.append(photoPreview);

const setFileUploadHandler = (fileChooser, preview, FILE_TYPES) => {
  const onFileUpload = (evt) => {
    const file = evt.target.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      fileChooser.setCustomValidity('');
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    } else if (!matches) {
      fileChooser.setCustomValidity('Можно загружать изображения в следующих форматах: *.gif, *.jpg, *.jpeg, *.png');
    }
    fileChooser.reportValidity();
  }
  fileChooser.addEventListener('change', onFileUpload)
};

const fileUpload = () => {
  setFileUploadHandler(avatarChooser, avatarPreview, FILE_TYPES);
  setFileUploadHandler(photoChooser, photoPreview, FILE_TYPES)
}

const clearPhotoUpload = () => {
  photoPreview.removeAttribute('src');
};

const clearFileSrc = (preview, src) => {
  preview.src = src;
};

export { clearFileSrc, avatarPreview, AVATAR_PREVIEW_SRC, clearPhotoUpload, fileUpload }

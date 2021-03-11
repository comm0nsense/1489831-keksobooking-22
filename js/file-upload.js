const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarPreviewSrc = 'img/muffin-grey.svg';

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
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  fileChooser.addEventListener('change', onFileUpload)
};

//Загрузка аватарки
const fileUpload = () => {
  setFileUploadHandler(avatarChooser, avatarPreview, FILE_TYPES);
  setFileUploadHandler(photoChooser, photoPreview, FILE_TYPES)
}

const clearPhotoUpload = () => {
  photoPreview.remove();
};

const clearFileSrc = (preview, src) => {
  preview.src = src;
};


export { clearFileSrc, avatarPreview, avatarPreviewSrc, clearPhotoUpload, fileUpload }

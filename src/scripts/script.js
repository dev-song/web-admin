const imageInput = document.querySelector('.upload-item__image');
const imagePreview = document.querySelector('.preview');
const CONTAINER_CLASSNAME = 'preview-image__container'
const IMAGE_CLASSNAME = 'preview-image';

function handleImage() {
  console.dir(this);
  console.log(this.files);
  updateImagePreview();
}

function updateImagePreview() {
  while (imagePreview.firstChild) {
    imagePreview.removeChild(imagePreview.firstChild);
  }

  const images = imageInput.files;
  if (images.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No images are selected';
    imagePreview.appendChild(p);
  } else {
    for (const image of images) {
      const container = document.createElement('figure');
      container.classList.add(CONTAINER_CLASSNAME);
      const img = document.createElement('img');
      img.classList.add(IMAGE_CLASSNAME);
      img.src = URL.createObjectURL(image);
      const caption = document.createElement('figcaption');
      caption.textContent = `Image name: ${image.name}`;

      container.appendChild(img);
      container.appendChild(caption);

      imagePreview.appendChild(container);
    }
  }
}

function init() {
  imageInput.addEventListener('change', handleImage);
}

document.addEventListener('DOMContentLoaded', init);
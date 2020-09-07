const dataSection = document.querySelector('.data');
const UPDATE_OVERLAY_CLASSNAME = 'overlay__update-item';
const UPDATE_BUTTON_CLASSNAME = 'item__modify-button';
const CLOSE_BUTTON_CLASSNAMES = ['update-item__close-button', 'expanded-image__close-button'];
const FOLD_BUTTON_CLASSNAME = 'cluster__button-show-hide';
const IMAGE_OVERLAY_CLASSNAME = 'overlay__expanded-image';
const IMAGE_CLASSNAME = 'item--image';

function openUpdateOverlay(e) {
  if (!e.target.classList.contains(UPDATE_BUTTON_CLASSNAME)) {
    return;
  }

  const id = e.target.parentNode.dataset.id;
  const building = e.target.parentNode.querySelector('.item--building').textContent;
  const space = e.target.parentNode.querySelector('.item--space').textContent;
  const description = e.target.parentNode.querySelector('.item--description').textContent;

  let overlay = document.querySelector(`.${UPDATE_OVERLAY_CLASSNAME}`);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = UPDATE_OVERLAY_CLASSNAME;
    dataSection.appendChild(overlay);
  }
  overlay.innerHTML = `
    <form class='update-item' method='post' action='/data-manager/update/${id}'>
      <h1 class='update-item__title'>Update Things</h1>
      <input class='update-item__building' type='number' name='building' placeholder='동 번호' value='${building}' required />
      <input class='update-item__space' type='number' name='space' placeholder='평형' value='${space}' required />
      <input class='update-item__description' type='text' name='description' placeholder='설명' value='${description}' />
      <p class='update-image__instruction'>이미지 수정은 지원되지 않습니다. 매물을 삭제하고 새로 업로드해주세요.</p>
      <input class='update-item__submit' type='submit' value='Update' />
      <button class='update-item__close-button' type='button'>X</button>
    </form>
  `;

  overlay.addEventListener('click', handleCloseButton);
}

function handleCloseButton(e) {
  if (!CLOSE_BUTTON_CLASSNAMES.includes(e.target.className)) {
    return;
  }

  const overlay = e.target.parentNode.parentNode;
  overlay.parentNode.removeChild(overlay);
}

function handleClustersFold(e) {
  if (!e.target.classList.contains(FOLD_BUTTON_CLASSNAME)) {
    return;
  }

  const clusterContent = e.target.parentNode.querySelector('.cluster__items');
  clusterContent.classList.toggle('cluster__items--hidden');
}

function openImageOverlay(e) {
  if (!e.target.classList.contains(IMAGE_CLASSNAME)) {
    return;
  }

  const src = e.target.src;
  let overlay = document.querySelector(`.${IMAGE_OVERLAY_CLASSNAME}`);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = IMAGE_OVERLAY_CLASSNAME;
    dataSection.appendChild(overlay);
  }

  overlay.innerHTML = `
    <figure class='expanded-image__container'>
      <h1 class='expanded-image__title'>확대 이미지</h1>
      <img class='expanded-image' src=${src} />
      <button class='expanded-image__close-button' type='button'>X</button>
    </figure>
  `;

  overlay.addEventListener('click', handleCloseButton);
}

function closeImageOverlay(overlay) {
  overlay.parentNode.removeChild(overlay);
}

function handleImageOverlay(e) {
  let overlay = document.querySelector(`.${IMAGE_OVERLAY_CLASSNAME}`);
  if (!overlay) {
    openImageOverlay(e);
    return;
  };

  let currentNode = e.target;
  let isInsideOverlay = false;
  while (currentNode !== document.body) {
    if (currentNode === overlay) {
      isInsideOverlay = true;
    }
    currentNode = currentNode.parentNode;
  }

  if (!isInsideOverlay) {
    closeImageOverlay(overlay);
  }
}

function init() {
  dataSection.addEventListener('click', openUpdateOverlay);
  dataSection.addEventListener('click', handleClustersFold);
  document.addEventListener('click', handleImageOverlay);
}

init();
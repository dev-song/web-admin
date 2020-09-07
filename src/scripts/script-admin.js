const dataSection = document.querySelector('.data');
const UPDATE_OVERLAY_CLASSNAME = 'overlay__update-item';
const UPDATE_BUTTON_CLASSNAME = 'item__modify-button';
const DELETE_BUTTON_CLASSNAME = 'update-item__close-button';

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
  if (!e.target.classList.contains(DELETE_BUTTON_CLASSNAME)) {
    return;
  }

  let overlay = document.querySelector(`.${UPDATE_OVERLAY_CLASSNAME}`);
  overlay.parentNode.removeChild(overlay);
}

function init() {
  dataSection.addEventListener('click', openUpdateOverlay);
}

init();
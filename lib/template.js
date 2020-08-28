module.exports = {
  HTML(title, body, header = '') {
    return `
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${title}</title>
          <link type="text/css" rel="stylesheet" href="./styles/styles.css" />
        </head>
        <body>
          ${header}
          ${body}
        </body>
      </html>
    `
  },
  clusters(productsData) {
    const data = JSON.parse(productsData);
    let clusters = [];

    for (let i = 0, len = data.length; i < len; i++) {
      const clusterNumber = parseInt(data[i]['cluster']);
      if (!clusters.includes(clusterNumber)) clusters.push(clusterNumber);
    }

    let clusterDiv = clusters.reduce((acc, cur) => {
      let obj = acc;
      obj[cur] = `
        <article class='clusters' id='cluster${cur}'>
          <h2 class='cluster--name'>${cur}단지</h2>
          <button class='cluster--button-show-hide'>▼ 접기/펼치기</button>
          <div class='cluster__items'>
          </div>
        </article>
      `;

      return obj;
    }, {});

    return clusterDiv;
  },
  products(productsData) {   // productsData should be in a form of JSON
    const data = JSON.parse(productsData);
    let sectionHtml = `<section class="data">`;
    const titleHtml = `<h2 class='data__title'>Item List</h2>`;
    const uploadHtml = `<a class='data__upload-link' href='/data-upload'>물건 추가</a>`;
    sectionHtml += titleHtml + uploadHtml;

    let clusterDiv = this.clusters(productsData);
    for (let i = 0, len = data.length; i < len; i++) {
      const clusterNumber = parseInt(data[i]['cluster']);
      const closingTag = '</div>';
      const item = `
        <article class='item__container' data-id=${data[i].id}>
          <p class='item--building'>${data[i].building}</p>
          <p class='item--space'>${data[i].space}</p>
          <p class='item--description'>${data[i].description}</p>
        </article>
      `;
      clusterDiv[clusterNumber] = clusterDiv[clusterNumber].replace(closingTag, item + closingTag);
    }

    for (const clusterNumber in clusterDiv) {
      sectionHtml += clusterDiv[clusterNumber];
    }
    sectionHtml += `</section>`;

    return sectionHtml;
  }
}
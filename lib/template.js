module.exports = {
  HTML: (title, body, header = '', loginUI = '') => `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body>
        <header>
          ${header}
          ${loginUI}
        </header>
        ${body}
      </body>
    </html>
  `,
  products: productData => {   // productData should be in a form of JSON
    const data = JSON.parse(productData);
    let html = `<section class="data">`;
    let clusters = [];

    for (let i = 0, len = data.length; i < len; i++) {
      const cluster = parseInt(data[i]['cluster']);
      if (!clusters.includes(cluster)) clusters.push(cluster);
    }

    let clustersHtml = clusters.reduce((acc, cur) => {
      let obj = acc;
      obj[cur] = `
        <section class='clusters' id='cluster${cur}'>
          <h2 class='cluster-number'>${cur}단지</h2>
          <article class='cluster-items'>
          </article>
        </section>
      `;

      return obj;
    }, {});

    for (let i = 0, len = data.length; i < len; i++) {
      const cluster = parseInt(data[i]['cluster']);
      const closingTag = '</article>';
      const item = `
        <div class='item__container' data-id=${data[i].id}>
          <p class='item--building'>${data[i].building}</p>
          <p class='item--space'>${data[i].space}</p>
          <p class='item--description'>${data[i].description}</p>
        </div>
      `;
      clustersHtml[cluster] = clustersHtml[cluster].replace(closingTag, item + closingTag);
    }

    for (const cluster in clustersHtml) {
      html += clustersHtml[cluster];
    }

    html += `</section>`;

    return html;
  }
}
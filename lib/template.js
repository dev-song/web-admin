module.exports = {
  HTML: (title, body, loginUI = '', dataManagerUI = '') => `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body>
        <header>
          ${loginUI}
          ${dataManagerUI}
        </header>
        ${body}
      </body>
    </html>
  `,
  product: productData => {   // productData should be in a form of JSON
    const data = JSON.parse(productData);
    let html = `<section class="data">`;

    for (let i = 0, len = data.length; i < len; i++) {
      console.log(data[i]);
      html += `<section class="data-item">${JSON.stringify(data[i])}</p>`
    }

    html += `</section>`;

    return html;
  }
}
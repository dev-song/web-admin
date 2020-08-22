module.exports = {
  HTML: (title, body, authLink = '<a href="/login">Login</a>') => `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>
      <body>
        <header>
          ${authLink}
        </header>
        ${body}
      </body>
    </html>
  `
}
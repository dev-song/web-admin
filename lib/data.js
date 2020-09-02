const fs = require('fs');

module.exports = {
  saveImageData(path, dataToSave) {
    fs.readFile(path, 'utf8', (err, fileData) => {
      if (err) throw err;

      let data = JSON.parse(fileData);
      if (!data) {
        data = [];
      }
      data.push(dataToSave);
      const newData = JSON.stringify(data, null, 2);

      fs.writeFile(path, newData, err => {
        if (err) throw err;

        console.log('New data is added: ', dataToSave);
      })
    })
  }
}
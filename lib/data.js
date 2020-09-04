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
        this.sortProductData(path);
      })
    })
  },
  getFileType(mimetype) {
    return mimetype.split('/')[1];
  },
  sortProductData(path) {
    fs.readFile(path, 'utf8', (err, fileData) => {
      if (err) throw err;

      let data = JSON.parse(fileData);
      if (!data) return;
      const sortedData = data.sort((a, b) => parseInt(a.info.building) - parseInt(b.info.building));
      const newData = JSON.stringify(sortedData, null, 2);

      fs.writeFile(path, newData, err => {
        if (err) throw err;

        console.log('File is sorted!');
      })
    })
  }
}
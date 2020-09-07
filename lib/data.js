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
  },
  deleteFiles(folderPath, fileNames) {
    if (fileNames) {
      fileNames.forEach(file => {
        fs.unlink(`${folderPath}/${file}`, err => {
          if (err) throw err;

          console.log(`${folderPath}/${file} is deleted successfully!`);
        })
      })
    }
  },
  deleteItemData(path, imageFolderPath, itemId) {
    fs.readFile(path, 'utf8', (err, fileData) => {
      if (err) throw err;

      let data = JSON.parse(fileData);
      let filteredData = data.filter(item => item.id !== parseInt(itemId));
      const newData = JSON.stringify(filteredData, null, 2);

      fs.writeFile(path, newData, err => {
        if (err) throw err;

        console.log(`Item (ID: ${itemId}) is removed from the data!`);
      })

      let imageFiles;
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === parseInt(itemId) && data[i].info.imagesInfo.length !== 0) {
          imageFiles = data[i].info.imagesInfo.map(info => info.fileName);

          break;
        }
      }

      this.deleteFiles(imageFolderPath, imageFiles);
    })
  },
  updateItemData(path, itemId, building, space, description) {
    fs.readFile(path, 'utf8', (err, fileData) => {
      if (err) throw err;

      let data = JSON.parse(fileData);
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].id === parseInt(itemId)) {
          data[i].info.building = building;
          data[i].info.cluster = Math.floor(parseInt(building) / 100);
          data[i].info.space = space;
          data[i].info.description = description;

          break;
        }
      }

      fs.writeFile(path, JSON.stringify(data, null, 2), err => {
        if (err) throw err;

        console.log(`Item (ID: ${itemId}) info is updated; building: ${building}, space: ${space}, description: ${description}`)
        this.sortProductData(path);
      })
    })
  }
}
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensionsValid = ['png', 'jpg', 'jpeg', 'gif'], directory = '') => {

  return new Promise((resolve, reject) => {

    // Extraer archivo
    const { archivo } = files;

    // Extaer extension
    const modifiedFile = archivo.name.split('.');
    const extensionFile = modifiedFile[modifiedFile.length - 1];

    // Validar la extension
    if (!extensionsValid.includes(extensionFile)) {
      return reject(`La extensión ${extensionFile} no esta permitida - ${extensionsValid}`)
    }

    // Renombrar el archivo con uuid, para que cada imagen tenga id unico
    const temporalName = uuidv4() + '.' + extensionFile;
    const uploadPath = path.join(__dirname, '../uploads/', directory, temporalName);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(temporalName)
    });
  })
}

module.exports = {
  uploadFile
}
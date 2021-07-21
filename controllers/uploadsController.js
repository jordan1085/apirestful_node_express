const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

const upload = async (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: 'No hay archivos para subir'
    });
    return;
  }

  try {
    const name = await uploadFile(req.files, undefined, 'img');

    res.json({
      name
    })
  } catch (error) {
    res.status(400).json({
      msg: error
    })
  }
}

const uploadUpdate = async (req, res) => {

  const {id, collection} = req.params;

  let model;

  switch (collection){
    case 'users':
      model = await User.findById(id);
      if(!model){
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}`
        })
      }
    break;

    case 'products':
      model = await Product.findById(id);
      if(!model){
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}`
        })
      }
    break;

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto'
      })
  }

  try {
    // Guardar la imagen en el directorio con el nombre de la colecion
    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;

    await model.save();

    res.json(
      model
    );
  } catch (error) {
    res.status(400).json({
      msg: error
    });
  }
}

module.exports = {
  upload,
  uploadUpdate
}
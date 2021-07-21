const { Product } = require('../models');

const getProducts = async (req, res) => {

  // Paginacion
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  try {
    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .skip(Number(from))
        .limit(Number(limit))
        .populate('user', 'name')
        .populate('category', 'name')
    ])

    res.json({
      total,
      products
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al optener los productos');
  }
}

const getProduct = async (req, res) => {

  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate('user', 'name')
      .populate('category', 'name')

    res.json({
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al optener las categorias');
  }
}

const createProduct = async (req, res) => {

  // Extraer
  const { state, user, ...body } = req.body;

  try {
    // Validar
    const productExists = await Product.findOne({ name: body.name })
    if (productExists) {
      res.status(400).json({
        msg: `La categoria ${productExists.name}, ya existe`
      });
    }

    // Generar la data para evitar que desde el frontend nos envien data
    const data = {
      ...body,
      name: body.name.toUpperCase(),
      user: req.user._id
    }

    // // Crear categoria
    const product = new Product(data);

    // Guardar db
    await product.save();

    res.status(201).json({
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al crear la producto');
  }

}

const updateProduct = async (req, res) => {

  // Extraer
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if(data.name){
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id; // Usuario que modifico

  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json({
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al actualizar la categoria');
  }
}

const deleteProduct = async (req, res) => {

  // Extraer
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true })

    res.json({
      product
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al eliminar la categoria');
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}

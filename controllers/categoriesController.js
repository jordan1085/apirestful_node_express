const { Category } = require('../models');

const getCategories = async (req, res) => {

  // Paginacion
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  try {
    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
              .skip(Number(from))
              .limit(Number(limit))
              .populate('user', 'name')
    ])

    res.json({
      total,
      categories
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al optener los usuarios');
  }
}

const getCategory = async (req, res) => {

  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate('user', 'name');

    res.json({
      category
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al optener las categorias');
  }
}

const createCategory = async (req, res) => {

  // Extraer
  const name = req.body.name.toUpperCase();

  try {
    // Validar
    const categoryExists = await Category.findOne({name})
    if(categoryExists){
      res.status(400).json({
        msg: `La categoria ${categoryExists.name}, ya existe`
      });
    }

    // Generar la data para evitar que desde el frontend nos envien data
    const data = {
      name,
      user: req.user._id
    }

    // Crear categoria
    const category = new Category(data);

    // Guardar db
    await category.save();

    res.status(201).json({
      category
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al crear la categoria');
  }

}

const updateCategory = async (req, res) => {

  // Extraer
  const { id } = req.params;
  const {state, user, ...data} = req.body;
  data.name = data.name.toUpperCase();
  data.user = req.user._id; // Usuario que modifico

  try {
    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json({
      category
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al actualizar la categoria');
  }
}

const deleteCategory = async (req, res) => {

  // Extraer
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(id, { state: false }, {new: true})

    res.json({
      category
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al eliminar la categoria');
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}

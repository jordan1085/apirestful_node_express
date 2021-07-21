const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const getUser = async (req, res) => {

  // Paginacion
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  try {
    // Conjunto de promesas
    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
      total,
      users
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al optener los usuarios');
  }
}

const createUser = async (req, res) => {

  const { name, email, password, role } = req.body;

  try {

    // Crear usuario con el modelo User
    const user = new User({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en la base de datos
    await user.save();

    res.json(user);

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error');
  }

}

const updateUser = async (req, res) => {

  const { id } = req.params;
  const { _id, password, google, email, ...data } = req.body;

  try {
    // Validar
    if (password) {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json({
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al actualizar el usuario');
  }
}

const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    // Borrar el usuario cambiando su estado
    const user = await User.findByIdAndUpdate(id, { status: false })

    // Extrae el usuario logeado desde la request "recuerda que se lo pasamos en el middleware"
    const validUser = req.user;

    res.json({
      user,
      validUser
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send('Hubo un error al eliminar el usuario');
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}

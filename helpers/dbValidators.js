const { User, Role, Category, Product } = require('../models');

// Verificar que el rol sea valido
const roleValidator = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`El rol ${role} no esta registrado`);
  }
};

// Verificar si el correo existe  
const emailExistsValidator = async (email = '') => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error(`El correo ${email} ya esta registrado`);
  }
};

// Verificar si el usuario existe  
const userByIdExists = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`El usuario no existe: ${id}`);
  }
};

// Verificar si existe categoria
const categoryByIdExists = async (id) => {
  const categoryExists = await Category.findById(id);
  if(!categoryExists){
    throw new Error(`La categoria no existe: ${id}`)
  }
}

// Verificar si el prodcuto existe
const productByIdExists = async (id) => {
  const productExists = await Product.findById(id);
  if(!productExists){
    throw new Error(`El producto no existe: ${id}`)
  }
}

const validCollection = (collection = [], validCollections = []) => {
  const include = validCollections.includes(collection);
  if(!include){
    throw new Error(`La coleccion ${collection} no es permitida`);
  }
  return true;
}

module.exports = {
  roleValidator,
  emailExistsValidator,
  userByIdExists,
  categoryByIdExists,
  productByIdExists,
  validCollection
}
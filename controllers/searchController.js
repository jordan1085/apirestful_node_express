const { ObjectId } = require('mongoose').Types;
const { User, Product, Category } = require('../models');


const allowedCollections = ['user', 'category', 'product', 'role'];

const searchUsers = async(term = '', res) => {
  
  const isMongoId = ObjectId.isValid( term );

  if(isMongoId){
    const user = await User.findById(term);

    return res.json({
      results: (user) ? [user] : []
    })
  }

  const regex = new RegExp(term, 'i'); // Insensible a mayusculas o minusculas
  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{status: true}]
  });

  res.json({
    results: users
  })
}

const searchCategories = async(term = '', res) => {
  
  const isMongoId = ObjectId.isValid( term );

  if(isMongoId){
    const category = await Category.findById(term);

    return res.json({
      results: (category) ? [category] : []
    })
  }

  const regex = new RegExp(term, 'i');
  const categories = await Category.find({name: regex, state: true});

  res.json({
    results: categories
  })
}

const searchProducts = async(term = '', res) => {
  
  const isMongoId = ObjectId.isValid( term );

  if(isMongoId){
    const product = await Product.findById(term)
                                 .populate('category', 'name');

    return res.json({
      results: (product) ? [product] : []
    })
  }

  const regex = new RegExp(term, 'i');
  const products = await Product.find({name: regex, state: true})
                                .populate('category', 'name');

  res.json({
    results: products
  })
}

const search = async (req, res) => {

  const { collection, term } = req.params;

  if(!allowedCollections.includes(collection)){
    return res.status(400).json({
      msg: 'Colecion no permitida'
    })
  }

  switch (collection) {
    case 'user':
      searchUsers(term, res);
    break;

    case 'category':
      searchCategories(term, res);
    break;

    case 'product':
      searchProducts(term, res);
    break;

    default:
      res.status(500).json({
        msg: 'Se me olvido hacer esta busqueda'
      })
  }
}

module.exports = {
  search
}
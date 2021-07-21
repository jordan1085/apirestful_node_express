const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    require: [true, 'El nombre es obligatorio'],
    unique: true
  },
  img: {
    type: String
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String
  },
  stock: {
    type: Boolean,
    default: true
  }
})

ProductSchema.methods.toJSON = function() {
  const { __v, state, ...product } = this.toObject();
  return product;
}

module.exports = model('Product', ProductSchema);
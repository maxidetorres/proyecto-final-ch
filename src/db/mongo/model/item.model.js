const mongoose = require('mongoose')
const { Schema } = mongoose
const ProductModel = require('./user.model').model

const ItemSchema = new Schema({
  product: { type: Schema.ObjectId, ref: ProductModel },
  cantidad: { type: Number },
  precio: { type: Number, required: true },
  total: { type: Number, required: true }

})

module.exports = mongoose.model('Item', ItemSchema)

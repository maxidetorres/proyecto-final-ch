const mongoose = require('mongoose')
const ProductSchema = require('./product.model').schema
const UserModel = require('./user.model').model
const ItemSchema = require('./item.model').schema
const { Schema } = mongoose

const CartSchema = new Schema({
  timestamp: { type: Date, default: Date.now() },
  /* productos: {
    type: [ProductSchema],
    default: undefined,
    required: true
  }, */
  items: { type: [ItemSchema] },
  subTotal: { default: 0, type: Number },
  user: { type: Schema.ObjectId, ref: UserModel }
})

module.exports = mongoose.model('Cart', CartSchema)

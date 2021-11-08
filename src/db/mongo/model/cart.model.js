const mongoose = require('mongoose')
const ProductSchema = require('./product.model').schema

const { Schema } = mongoose

const CartSchema = new Schema({
  timestamp: { type: Date, default: Date.now() },
  productos: { 
    type: [ProductSchema],
    default: undefined,
    required: true }
})

module.exports = mongoose.model('Cart', CartSchema)
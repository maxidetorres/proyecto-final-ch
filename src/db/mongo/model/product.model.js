const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
  nombre: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  descripcion: { type: String, required: true },
  codigo: { type: String },
  stock: { type: Number, required: true},
  urlFoto: { type: String },

})

module.exports = mongoose.model('Product', ProductSchema)
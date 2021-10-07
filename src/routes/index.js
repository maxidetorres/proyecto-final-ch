const express = require('express')
const router = express.Router()

const product = require('./product.route')
const cart = require('./cart.route')

router.use('/api/productos', product)
router.use('/api/carrito', cart)

module.exports = router

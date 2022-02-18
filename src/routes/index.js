const express = require('express')
const router = express.Router()

const product = require('./product.route')
const cart = require('./cart.route')
const user = require('./user.route')
const productService = require('../service/product.service')

router.use('/api/productos', product)
router.use('/api/carrito', cart)
router.use('/api/user', user)
router.use('/login', (req, res) => { res.render('login') })
router.use('/register', (req, res) => { res.render('register') })
router.use('/productos', async (req, res) => {
  const products = await productService.getAllProducts(req, res)
  res.render('products', { products: products.data })
})

module.exports = router

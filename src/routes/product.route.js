const express = require('express')
const isAdmin = require('../middleware/is-admin.middleware')
const router = express.Router()
/* const productLogic = require('../logic/product/product.logic')
const productMongoLogic = require('../logic/product/product-mongo.logic')
const productFirebaseLogic = require('../logic/product/product-firebase.logic') */

const productLogic = require('../logic/product/index')

/* router.get('/', productLogic.getAllProducts) */
/* router.get('/', productMongoLogic.getAllProducts) */
router.get('/', productLogic.getAllProducts)
router.get('/:id', productLogic.getProductById)
/* router.get('/:id', productMongoLogic.getProductById) */
/* router.get('/:id', productLogic.getProductById) */
/* router.post('/', isAdmin , productLogic.addProduct) */
/* router.post('/', isAdmin , productMongoLogic.saveProduct) */
router.post('/', isAdmin, productLogic.saveProduct)
/* router.put('/:id', isAdmin, productLogic.updateProductById) */
router.put('/:id', isAdmin, productLogic.updateProductById)
/* router.put('/:id', isAdmin, productMongoLogic.updateProductById) */
/* router.delete('/:id', isAdmin, productLogic.deleteProductById) */
router.delete('/:id', isAdmin, productLogic.deleteProductById)
/* router.delete('/:id', isAdmin, productMongoLogic.deleteProductById) */

module.exports = router

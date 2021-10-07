const express = require('express')
const isAdmin = require('../middleware/is-admin.middleware')
const router = express.Router()
const productLogic = require('../logic/product.logic')


router.get('/', productLogic.getAllProducts)
router.get('/:id', productLogic.getProductById)
router.post('/', isAdmin , productLogic.addProduct)
router.put('/:id', isAdmin, productLogic.updateProductById)
router.delete('/:id', isAdmin, productLogic.deleteProductById)

module.exports = router

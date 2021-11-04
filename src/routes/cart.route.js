const express = require('express')

const router = express.Router()

const cartLogic = require('../logic/cart/cart.logic')

router.post('/', cartLogic.addCart)
router.delete('/:id', cartLogic.deleteCartById)
router.get('/:id/productos', cartLogic.getProductsCart)
router.post('/:id/productos', cartLogic.addProductCart )
router.delete('/:id/productos/:idProd', cartLogic.deleteProductCart)

module.exports = router

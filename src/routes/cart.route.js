const express = require('express')

const router = express.Router()

const cartLogicMem = require('../logic/cart/cart.logic')
const cartLogicMongo = require('../logic/cart/cart-mongo.logic')

const cartLogic = require('../logic/cart/index')

router.post('/', cartLogic.addCart)
/* router.post('/', cartLogicMongo.addCart) */
router.delete('/:id', cartLogic.deleteCartById)
/* router.delete('/:id', cartLogicMongo.deleteCartById) */
router.get('/:id/productos', cartLogic.getProductsCart)
/* router.get('/:id/productos', cartLogicMongo.getProductsCart) */
router.post('/:id/productos', cartLogic.addProductCart )
/* router.post('/:id/productos', cartLogicMongo.addProductCart ) */
router.delete('/:id/productos/:idProd', cartLogic.deleteProductCart)
/* router.delete('/:id/productos/:idProd', cartLogicMongo.deleteProductCart) */

module.exports = router

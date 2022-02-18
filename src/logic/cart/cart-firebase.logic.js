const OperationFirebaseDao = require('../../dao/operation-firebase.dao')
const { v4: uuidv4 } = require('uuid')
const collectionCarts = 'carts'
const { pickBy, identity } = require('lodash')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
const cartLogicFirebase = {}

cartLogicFirebase.addCart = async (req, res) => {
  const { producto, cantidad } = req.body

  const cart = {
    productos: [Object.assign({}, producto, { cantidad })],
    timestamp: Date.now()
  }
  try {
    const result = await OperationFirebaseDao.save(collectionCarts, cart)
    return res.status(200).json(result)
  } catch (e) {
    console.log('ERROR', e)
    return res.status(400).json({
      error: e
    })
  }
}

cartLogicFirebase.deleteCartById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await OperationFirebaseDao.deleteById(collectionCarts, id)
    return res.status(200).send({
      result,
      message: `Se eliminó correctamente el producto con id ${id}`
    })
  } catch (e) {
    console.log('error', e)
  }
}

cartLogicFirebase.getProductsCart = async (req, res) => {
  const { id } = req.params
  try {
    const cart = await OperationFirebaseDao.getById(collectionCarts, id)

    res.status(200).send({
      id: cart.id,
      ...cart.data()
    })
  } catch (e) {
    console.log('error getProductCart', e)
    res.status(400).send({
      error: e
    })
  }
}

cartLogicFirebase.addProductCart = async (req, res) => {
  const { id } = req.params
  const { producto, cantidad } = req.body

  const update = JSON.parse(JSON.stringify(Object.assign({}, producto, { cantidad })))
  console.log(update)
  let filter, cart
  // const cartById = await OperationFirebaseDao.getById(collectionCarts,id)
  const existProductInCart = []
  // console.log(cartById.data())

  /*  if(cartById){
    existProductInCart = cartById.data().productos.filter( (result) => result.id == producto.id)
    console.log(existProductInCart)
  } */

  if (existProductInCart[0]) {
    filter = {
      'productos._id': existProductInCart[0]._id
    }
    cart = {
      $set: {
        'productos.$.cantidad': cantidad + existProductInCart[0].cantidad
      }
    }
  } else {
    filter = {
      productos: FieldValue.arrayUnion(update)
    }
  }

  try {
    const cartUpdated = await OperationFirebaseDao.updateByFilter(collectionCarts, id, filter)
    return res.status(200).send(cartUpdated)
  } catch (e) {
    console.log('Error addProductCart', e)
    return res.status(400).send({
      error: 'Carrito de compra no encontrado',
      mesagge: e
    })
  }
}
cartLogicFirebase.deleteProductCart = async (req, res) => {
  const { id, idProd } = req.params
  console.log(idProd)
  const cart = await OperationFirebaseDao.getById(collectionCarts, id)

  const productsCart = {
    id: cart.id,
    ...cart.data()
  }

  const updateCart = productsCart.productos.filter((result) => result.id == idProd)

  const filter = {
    productos: FieldValue.arrayRemove(...updateCart)
  }
  try {
    const productCartDeleted = await OperationFirebaseDao.updateByFilter(collectionCarts, id, filter)
    return res.status(200).send(productCartDeleted)
  } catch (e) {
    console.log('Error deleteProductCart', e)
    return res.status(400).send({
      error: 'No se pudo eliminar el producto',
      mesagge: e
    })
  }
}
module.exports = cartLogicFirebase

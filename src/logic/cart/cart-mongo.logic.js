const CartModel = require('../../db/mongo/model/cart.model')
const ProductModel = require('../../db/mongo/model/product.model')
const OperationMongoDao = require('../../dao/operation-mongo.dao')
const { v4: uuidv4 } = require('uuid')
const { sendSms } = require('../../service/sendSms')
const { sendMail } = require('../../service/sendMail.service')

exports.addCart = async (req, res) => {
  const { itemId, cantidad } = req.body
  const { user } = req
  let resultSaveCart
  const filter = {
    user: user.id
  }
  // buscar si existe carrito para usuario logueado
  const userCart = await OperationMongoDao.getByFilter(CartModel, filter)

  // buscar todo el producto
  const completeProduct = await OperationMongoDao.getById(ProductModel, itemId)

  if (userCart.length) {
    // buscar la posición del producto en el array de items
    const indexItems = userCart[0].items.findIndex((result) => {
      return result._id.equals(itemId)
    })

    // Si existe el producto en el carrito le sumo la nueva cantidad y recalculo total
    if (indexItems !== -1) {
      userCart[0].items[indexItems].cantidad = userCart[0].items[indexItems].cantidad + cantidad
      userCart[0].items[indexItems].total = userCart[0].items[indexItems].cantidad * completeProduct.precio
      userCart[0].items[indexItems].precio = completeProduct.precio
      userCart[0].subTotal = userCart[0].items.map(item => item.total).reduce((acc, curr) => acc + curr)
    } else {
      userCart[0].items.push({
        _id: itemId,
        cantidad: cantidad,
        precio: completeProduct.precio,
        total: parseInt(completeProduct.precio * cantidad).toFixed(2)
      })
      userCart[0].subTotal = userCart[0].items.map(item => item.total).reduce((acc, curr) => acc + curr)
    }
    resultSaveCart = await OperationMongoDao.save(CartModel, userCart[0])
  } else {
    const newCart = {
      user: user.id,
      items: [{
        _id: itemId,
        cantidad: cantidad,
        total: parseInt(completeProduct.precio * cantidad),
        precio: completeProduct.precio
      }],
      subTotal: parseInt(completeProduct.precio * cantidad)
    }
    resultSaveCart = await OperationMongoDao.save(CartModel, newCart)
  }
  return res.status(200).json({
    message: 'Se agrego items correctamnete',
    data: resultSaveCart
  })
}

exports.deleteCartById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await OperationMongoDao.deleteById(CartModel, id)
    return res.status(200).send(result)
  } catch (e) {
    console.log(e)
    return res.status(400).send({
      error: e
    })
  }
}
exports.getProductsCart = async (req, res) => {
  const { id } = req.params
  try {
    const cart = await OperationMongoDao.getById(CartModel, id)
    console.log('CARTTTT', cart.productos)
    res.status(200).send(cart.productos)
  } catch (e) {
    console.log('error getProductCart', e)
    res.status(400).send({
      error: e
    })
  }
}

exports.addProductCart = async (req, res) => {
  const { id } = req.params
  const { producto, cantidad } = req.body
  let filter, cart
  const cartById = await OperationMongoDao.getById(CartModel, id)
  let existProductInCart = 0
  if (cartById) {
    existProductInCart = cartById.productos.filter((result) => result._id === producto._id)
    console.log(existProductInCart)
  }

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
      _id: id
    }
    cart = {
      $push: {
        productos: Object.assign({}, producto, { cantidad })
      }
    }
  }

  try {
    const cartUpdated = await OperationMongoDao.updateByFilter(CartModel, filter, cart)
    return res.status(200).send(cartUpdated)
  } catch (e) {
    console.log('Error addProductCart', e)
    return res.status(400).send({
      error: 'Carrito de compra no encontrado',
      mesagge: e
    })
  }
}

exports.deleteProductCart = async (req, res) => {
  const { idProd } = req.params
  const { user } = req
  let resultDeleteProductCart
  const filter = {
    user: user.id
  }
  // buscar si existe carrito para usuario logueado
  const userCart = await OperationMongoDao.getByFilter(CartModel, filter)

  if (userCart.length) {
    // buscar la posición del producto en el array de items
    const indexItems = userCart[0].items.findIndex((result) => {
      return result._id.equals(idProd)
    })

    userCart[0].items.splice(indexItems, 1)
    userCart[0].subTotal = userCart[0].items.map(item => item.total).reduce((acc, curr) => acc + curr)
    // Si existe el producto en el carrito le sumo la nueva cantidad y recalculo total

    resultDeleteProductCart = await OperationMongoDao.save(CartModel, userCart[0])
  } else {
    return res.status(200).json({
      message: 'No se encontro el items seleccionado'
    })
  }
  return res.status(200).json({
    message: 'Se eliminó items correctamnete',
    data: resultDeleteProductCart
  })
}
exports.buyCart = async (req, res) => {
  const { user } = req
  const filter = {
    user: user.id
  }
  /* const userCart = await CartModel.find(filter) */
  const userCart = await OperationMongoDao.getByFilter(CartModel, filter)
  const arrayProducts = userCart[0].items
  console.log(arrayProducts)
  const msj = `Su pedido ${userCart[0]._id} se genero correctamente`
  sendSms('+543515178504', msj)

  const subject = 'Se creo un nuevo pedido'
  const bodyMail = `<b>Se genero una nueva orden con los siguientes pedidos:</b></br>
  ${JSON.stringify(arrayProducts)}`
  sendMail(subject, bodyMail)
  res.status(200).json({ message: 'Se a creado el nuevo pedido' })
}

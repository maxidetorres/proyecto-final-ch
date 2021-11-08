const Product = require('../../db/mongo/model/product.model')
const CartModel = require('../../db/mongo/model/cart.model')
const OperationMongoDao = require('../../dao/operation-mongo.dao')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')


exports.addCart = async (req, res) => {
  const { producto, cantidad } = req.body
  
  const cart = {
    productos: Object.assign( {}, producto, { cantidad })
  }
  try{
    const result = await OperationMongoDao.save(CartModel,cart)
    console.log("RESULT", result)
    return res.status(200).json(result)
  }catch(e){
    console.log("ERROR",e)
    return res.status(400).json({
      "error":e
    })
  }
}

exports.deleteCartById = async (req, res) => {
  const { id } = req.params
  try{
    const result = await OperationMongoDao.deleteById(CartModel, id)
    return res.status(200).send(result)
  }catch(e){
    console.log(e)
    return res.status(400).send({
      error: e
    })
  }
}
exports.getProductsCart = async (req, res) => {
  const { id } = req.params
  try{
  const cart = await OperationMongoDao.getById(CartModel,id)
  console.log("CARTTTT", cart.productos)
  res.status(200).send(cart.productos)
  }catch(e){
    console.log("error getProductCart",e)
    res.status(400).send({
      "error": e
    })
  }
}


exports.addProductCart = async (req, res) => {
  const { id } = req.params
  const { producto, cantidad } = req.body
  let filter, cart
  const cartById = await OperationMongoDao.getById(CartModel,id)
 let existProductInCart = 0  
  if(cartById){
    existProductInCart = cartById.productos.filter( (result) => result._id == producto._id) 
    console.log(existProductInCart)
  }
  
  if(existProductInCart[0]){
    filter = {
      'productos._id': existProductInCart[0]._id
    }
    cart = {
      '$set': {
        'productos.$.cantidad': cantidad + existProductInCart[0].cantidad
      }
    }
  }else {
    filter = {
      _id: id
    }
     cart = {
      $push: { 
        productos: Object.assign( {}, producto, { cantidad })
        } 
    }
  }
  
  try{
    const cartUpdated = await OperationMongoDao.updateByFilter(CartModel,filter, cart)
    return res.status(200).send(cartUpdated)
  }catch(e){
    console.log("Error addProductCart",e)
    return res.status(400).send({
      error: 'Carrito de compra no encontrado',
      mesagge: e
    })
  }
}

exports.deleteProductCart = async (req,res) => {
  const { id, idProd } = req.params
  let filter, cart
    filter = {
      _id: id
    }
     cart = {
      $pull: { 
        productos: { "_id" : idProd } 
        } 
    }
    try{
      const productCartDeleted = await OperationMongoDao.updateByFilter(CartModel,filter, cart)
      return res.status(200).send(productCartDeleted)
    }catch(e){
      console.log("Error addProductCart",e)
      return res.status(400).send({
        error: 'Carrito de compra no encontrado',
        mesagge: e
      })
    }
}

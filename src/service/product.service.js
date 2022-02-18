const Product = require('../db/mongo/model/product.model')
const ProductMongoDao = require('../dao/operation-mongo.dao')
const { v4: uuidv4 } = require('uuid')

exports.getAllProducts = async (req, res) => {
  const products = await ProductMongoDao.getAll(Product)
  return {
    data: products
  }
}

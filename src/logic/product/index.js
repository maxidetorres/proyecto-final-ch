const productFirebaseLogic = require('./product-firebase.logic')
const productMongoLogic = require('./product-mongo.logic')
const productMem = require('./product.logic')

let productLogic
console.log(process.env.PRODUCT_OPTION)
switch (process.env.PRODUCT_OPTION) {
  case 'firebase':
    console.log("firebase")
    productLogic = productFirebaseLogic
    break
  case 'mongodb':
    console.log("mongodb")
    productLogic = productMongoLogic
    break
  default:
    console.log("memoria")
    productLogic = productMem
    console.log(productLogic)
    break
}

module.exports = productLogic
const cartFirebaseLogic = require('./cart-firebase.logic')
const cartMongoLogic = require('./cart-mongo.logic')
const cartMem = require('./cart.logic')

let cartLogic
console.log(process.env.DB_OPTION)
switch (process.env.DB_OPTION) {
  case 'firebase':
    console.log('firebase')
    cartLogic = cartFirebaseLogic
    break
  case 'mongodb':
    console.log('mongodb')
    cartLogic = cartMongoLogic
    break
  default:
    console.log('memoria')
    cartLogic = cartMem
    break
}

module.exports = cartLogic

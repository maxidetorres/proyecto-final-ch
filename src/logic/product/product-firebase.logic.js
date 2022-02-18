const ProductFirebaseDao = require('../../dao/operation-firebase.dao')
const { v4: uuidv4 } = require('uuid')
const collectionProducts = 'products'
const { pickBy, identity } = require('lodash')

const productLogicFirebase = {}
productLogicFirebase.getAllProducts = async (req, res) => {
  const products = await ProductFirebaseDao.getAll(collectionProducts)
  const result = products.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
  return res.json(result)
}
productLogicFirebase.saveProduct = async (req, res) => {
  const { nombre, descripcion, precio, stock, urlFoto } = req.body
  const codigo = uuidv4()

  const productItem = {
    nombre: nombre,
    descripcion: descripcion,
    stock: stock,
    codigo: codigo,
    precio: precio,
    urlFoto: urlFoto
  }
  try {
    const product = await ProductFirebaseDao.save(collectionProducts, productItem)
    return res.status(200).json({ message: 'se guardó productos ', producto: product })
  } catch (e) {
    console.log('ERORR AL GUARDAR PROUDCTO', e)
    return res.status(400).send({
      error: 'El Producto no se pudo guardar',
      message: e
    })
  }
}

productLogicFirebase.getProductById = async (req, res) => {
  const { id } = req.params
  const product = await ProductFirebaseDao.getById(collectionProducts, id)
  if (!product.exists) {
    return res.status(400).send({
      error: 'No se encontró el producto'
    })
  }
  return res.status(200).send({
    id: product.id,
    ...product.data()
  })
}

productLogicFirebase.updateProductById = async (req, res) => {
  const { id } = req.params

  /* const cleanedObject = pickBy(req.body, identity)
    console.log(cleanedObject) */
  const update = JSON.parse(JSON.stringify(req.body))

  try {
    const productUpdated = await ProductFirebaseDao.updateByFilter(collectionProducts, id, update)
    return res.status(200).send({
      message: 'Se guardó correctamente el producto',
      producto: update
    })
  } catch (e) {
    return res.status(400).send({
      error: 'Error al guardar el producto',
      message: e
    })
  }
}

productLogicFirebase.deleteProductById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await ProductFirebaseDao.deleteById(collectionProducts, id)
    return res.status(200).send({
      result,
      message: `Se eliminó correctamente el producto con id ${id}`
    })
  } catch (e) {
    console.log('error', e)
  }
}

function getBodyParams ({ nombre, descripcion, precio, stock, urlFoto } = {}) {
  return { nombre, descripcion, precio, stock, urlFoto }
}

module.exports = productLogicFirebase

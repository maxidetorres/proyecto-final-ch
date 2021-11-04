const Product = require('../../db/mongo/model/product.model')
const ProductMongoDao = require('../../dao/operation-mongo.dao')
const { v4: uuidv4 } = require('uuid');

exports.getAllProducts = async (req, res) => {
    const products = await ProductMongoDao.getAll(Product)
    return res.json(products)
 }

exports.saveProduct = async (req, res) =>  {
    const { nombre, descripcion,precio, stock, urlFoto} = req.body
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
      const product = await ProductMongoDao.save(Product, productItem)
      return res.status(200).json({ message: 'se guardó productos ',producto: product})
    }catch(e){
      console.log("ERORR AL GUARDAR PROUDCTO", e)
      return res.status(400).send({
        error: 'El Producto no se pudo guardar',
        message: e
      })
     
    }
 }

 exports.getProductById = async (req,res) => {
  const { id } = req.params
  const product = await ProductMongoDao.getById(Product, id)
  if (!product){
    return res.status(400).send({
      error: 'No se encontró el producto'
    })
  }
  return res.status(200).send(product)
}

exports.updateProductById = async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion,precio, stock, urlFoto } = req.body
  const filter = {
    _id: id
  }
  const update = {
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    stock: stock,
    urlFoto: urlFoto
  }
  try{
    const productUpdated = await ProductMongoDao.updateByFilter(Product, filter, update)
    return res.status(200).send({
      message: 'Se guardó correctamente el producto',
      productUpdated
    })
  }catch(e){
    return res.status(400).send({
      error: 'Error al guardar el producto',
      message: e
    })
  }
}


exports.deleteProductById = async (req, res) => {
  const { id } = req.params
  
  try{
    const result = await ProductMongoDao.deleteById(Product, id)
    return res.status(200).send({
      result,
      message: "Se eliminó correctamente el producto"
    })
  }catch (e){
    console.log("error", e)
  }
}
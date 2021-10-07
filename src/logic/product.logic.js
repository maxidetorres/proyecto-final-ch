const { v4: uuidv4 } = require('uuid');
let arrayProduct = [
    { id:1, nombre:"Escuadra", timestamp:1633455624697, descripcion:"Escuadra de tamaño normal", codigo:"11648f97-df68-49a5-8938-7a02b1287d2a", stock: 4, precio:123.45, urlFoto:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"},
    { id:2, nombre:"Calculadora", timestamp:1633455624697, descripcion:"Calculadora cientifica profesional", codigo:"57ec687f-4bbe-467a-ab18-f073785c11e7", stock: 4, precio:234.56, urlFoto:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"}
]


exports.getAllProducts = async (req, res) => {
   return res.status(200).send(arrayProduct)
}

exports.getProductById = async (req,res) => {
    const { id } = req.params
    const product = arrayProduct.filter( result => result.id == id)
    if(!product[0]){
        return res.status(400).send({
            error: 'Producto no encontrado'
          })
    }
    res.status(200).send(product)
}

exports.addProduct = async (req, res) => {
    const { nombre, descripcion,precio, urlFoto} = req.body
    const codigo = uuidv4()
    const lastId = arrayProduct.find( result => result.id == Math.max(...arrayProduct.map(result => result.id)));
    
    const product = {
        id: lastId.id + 1 ,
        nombre: nombre,
        timestamp: Date.now(),
        descripcion: descripcion,
        codigo: codigo,
        precio: precio,
        codigo: codigo,
        urlFoto: urlFoto
    }
    arrayProduct.push(product)
    return res.status(200).json(product)
}

exports.updateProductById = async (req, res) => {
    const { nombre, descripcion,precio, urlFoto } = req.body
    const index = arrayProduct.findIndex( result => result.id == req.params.id )

    if( index > -1){
        if (nombre) arrayProduct[index].nombre = nombre
        if (descripcion) arrayProduct[index].descripcion = descripcion
        if (precio) arrayProduct[index].precio = precio
        if (urlFoto) arrayProduct[index].urlFoto = urlFoto
        return res.status(200).send(arrayProduct[index])
    }

    return res.status(400).send({
        error: 'Producto no encontrado'
    })
}

exports.deleteProductById = async (req, res) => {
    const { id } = req.params
    
    const index = arrayProduct.findIndex( result => result.id == id )

    if( index > -1){
        arrayProduct = arrayProduct.filter(result => result.id != id)
        return res.status(200).send(arrayProduct)
    }
    
    return res.status(400).send({
        error: 'Producto no encontrado'
    })
}
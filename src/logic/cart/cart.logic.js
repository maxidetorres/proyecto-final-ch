
let arrayCart = [ 
    {
        "id": 1,
        "timestamp": 1633621752909,
        "producto": [
            {
                "id": 2,
                "nombre": "Calculadora",
                "timestamp": 1633455624697,
                "descripcion": "Calculadora cientifica profesional",
                "codigo": "57ec687f-4bbe-467a-ab18-f073785c11e7",
                "stock": 4,
                "precio": 234.56,
                "urlFoto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
            }
        ]
    }
]


exports.addCart = async (req, res) => {
    const { producto } = req.body
    const lastId = arrayCart.find( result => result.id == Math.max(...arrayCart.map(result => result.id)));

    const cart = {
        id: lastId ? lastId.id + 1 : 1,
        timestamp: Date.now(),
        producto:producto
    }
    arrayCart.push(cart)
    return res.status(200).json(cart)
}

exports.deleteCartById = async (req, res) => {
    const { id } = req.params
    const index = arrayCart.findIndex( result => result.id == id )

    if( index > -1){
        arrayCart = arrayCart.filter(result => result.id != id)
        return res.status(200).send(arrayCart)
    }
    
    return res.status(400).send({
        error: 'Carrito no encontrado'
    })
}

exports.getProductsCart = async (req, res) => {
    const { id } = req.params
    const cart = arrayCart.filter( result => result.id == id)
    if(!cart[0]){
        return res.status(400).send({
            error: 'Carrito de compra no encontrado'
          })
    }
    res.status(200).send(cart)
}

exports.addProductCart = async (req, res) => {
    const { id } = req.params
    const { producto} = req.body

    const index = arrayCart.findIndex( result => result.id == id )

    if( index > -1){
        
        arrayCart[index].producto.push(producto)
        
        return res.status(200).send(arrayCart)
    }

    return res.status(400).send({
        error: 'Carrito de compra no encontrado'
      })
}

exports.deleteProductCart = async (req,res) => {
    const { id, idProd } = req.params

    const indexCart = arrayCart.findIndex( result => result.id == id )

    if( indexCart > -1){
        console.log( arrayCart[indexCart])
        const indexProduct = arrayCart[indexCart].producto.findIndex( result => result.id == idProd )
        if(indexProduct > -1){
              
            if(indexProduct === 0) {
                arrayCart[indexCart].producto.shift()   
            }else {
                arrayCart[indexCart].producto.splice(indexProduct, 1)
            }
           
            return res.status(200).send(arrayCart)
        }
        return res.status(400).send({
            error: 'No se encontró el producto que quiere elminar'
          })
    }

    return res.status(400).send({
        error: 'Carrito de compra no encontrado'
      })

}
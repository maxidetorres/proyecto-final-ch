# proyecto-final-ch

### `npm run start`

Ejecuta la api en modo desarrollador
Abrir [http://localhost:8080](http://localhost:8080)

# Enpoints Productos

GET  [http://localhost:8080/api/product/](http://localhost:8080/api/product)      -> Se obtienen todos los productos .\
GET  [http://localhost:8080/api/product/:id](http://localhost:8080/api/product/:id)    -> Se obtiene producto por id .\
POST [http://localhost:8080/api/product](http://localhost:8080/api/product)       -> Se agrega un nuevo producto .\
PUT  [http://localhost:8080/api/product/:id](http://localhost:8080/api/product/:id)   -> Se actualiza producto por id .\
DELETE [http://localhost:8080/api/product/:id](http://localhost:8080/api/product/:id) -> Se elimina producto por id .

# Enpoints Carrito

POST [http://localhost:8080/api/carrito/](http://localhost:8080/api/carrito) Creación de un nuevo carrito .\
DELETE [http://localhost:8080/api/carrito/:id](http://localhost:8080/api/carrito/:id) Se elimina carrito según ID con todos los productos.\
GET [http://localhost:8080/api/carrito/:id/productos](http://localhost:8080/api/carrito/:id/productos) Se obtienen los productos del carrito según ID .\
POST [http://localhost:8080/api/carrito/:id/productos](http://localhost:8080/api/carrito/:id/productos) Se agrega un nuevo producot al carrito .\
DELETE [http://localhost:8080/api/carrito/:id/productos/:idProd](http://localhost:8080/api/carrito/:id/productos/:idProd) Se elimina un producto del carrito

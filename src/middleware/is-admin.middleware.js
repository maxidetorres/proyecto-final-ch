const admin = true

module.exports = async (req, res, next) => {
  console.log(req)
  const {baseUrl, method} = req
  if (!admin ) {
    return res.status(401).send({
      error: '-1',
      message: `Ruta ${baseUrl} y metodo ${method} no autorizado`
    })
  }
      next()
}

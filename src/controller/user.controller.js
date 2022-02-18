
const userService = require('../service/user.service')
const logger = require('../logger').createLogger({ fileName: __filename })

exports.register = async (req, res) => {
  const { email, password } = req.body
  const { file } = req
  if (!file) {
    logger.error('No se pudo cargar la imagen de perfil', { opt: 'VALIDATION' })
    return res.status(400).send({
      status: 'ERROR',
      errorMessage: 'Error al guardar imagen'
    })
  }
  if (!email) {
    logger.error('Email es requerido.', { opt: 'VALIDATION' })
    return res.status(400).send({
      status: 'ERROR',
      errorMessage: 'Email es obligatorio'
    })
  }
  if (!password) {
    logger.error('Password es requerido.', { opt: 'VALIDATION' })
    return res.status(400).send({
      status: 'ERROR',
      errorMessage: 'Password es obligatorio'
    })
  }
  logger.info('Invocacion al servicio Register user', { params: req.body })
  const resp = await userService.register(req)
  return res.status(resp.status).send(resp)
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  console.log("REQ USER", req.user)
  if (!email) {
    logger.error('Email es requerido.', { opt: 'VALIDATION' })
    return res.status(400).send({
      status: 'ERROR',
      errorMessage: 'Email es obligatorio'
    })
  }
  if (!password) {
    logger.error('Password es requerido.', { opt: 'VALIDATION' })
    return res.status(400).send({
      status: 'ERROR',
      errorMessage: 'Password es obligatorio'
    })
  }
  logger.info('Invocacion al servicio Login user', { params: req.body })
  const resp = await userService.login(req)
  return res.status(resp.status).send(resp)
}

const nodemailer = require('nodemailer')
const logger = require('../logger').createLogger({ fileName: __filename })
const config = require('config')

const etherealUser = config.get('ethereal.user')
const etherealPassword = config.get('ethereal.password')

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: etherealUser,
    pass: etherealPassword
  }
})

exports.sendMail = async (subjet, body) => {
  try {
    const info = await transporter.sendMail({
      to: etherealUser,
      subject: subjet,
      html: body
    })
    logger.info('Se envio el mail correctamente', { info: info.envelope, messageId: info.messageId })
    return info
  } catch (error) {
    logger.error('Error al enviar el mail', error)
    throw error
  }
}

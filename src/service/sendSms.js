const twilio = require('twilio')
const logger = require('../logger').createLogger({ fileName: __filename })
const config = require('config')

const acctSid = process.env.TWILIO_ACCOUNT_SID || config.get('twilio.account_sid')
const authToken = process.env.TWILIO_TOKEN || config.get('twilio.token')

const twilioClient = twilio(acctSid, authToken)

const from = process.env.TWILIO_PHONE || config.get('twilio.phone')

exports.sendSms = async (to, body) => {
  try {
    const info = await twilioClient.messages.create({ body, from, to })
    logger.info('SMS enviado correctamente', info)
  } catch (error) {
    logger.error('Error al enviar el SMS', error)
  }
}

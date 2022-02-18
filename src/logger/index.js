const winston = require('winston')
const { combine, timestamp, colorize, align, errors, json, simple } = winston.format

module.exports.createLogger = ({ fileName, meta } = {}) => {
  const fname = fileName && fileName.split('/').slice(-1).pop()
  const isLocal = process.env.NODE_ENV === 'lo' || process.env.NODE_ENV === 'integration-test'

  const obfuscateAxios = winston.format(info => {
    if (info.isAxiosError) {
      delete info.request
      delete info.response
      delete info.config
      delete info.code
    }

    return info
  })

  const logger = winston.createLogger({
    level: isLocal ? 'debug' : 'info',
    format: combine(
      errors({ stack: isLocal }),
      obfuscateAxios()
    ),
    handleExceptions: false,
    defaultMeta: {
      fileName: fname,
      ...meta
    }
  })

  if (isLocal) {
    logger.add(new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        align(),
        simple()
      )
    }))
  } else {
    logger.add(new winston.transports.Console({
      format: combine(
        timestamp(),
        json()
      )
    }))
  }

  logger.error = function (msg, error, meta) {
    const message = error ? msg + ' ' : msg
    if (error && meta) {
      const e = Object.assign(error, meta)
      e.toJSON = undefined
      logger.log('error', message, e)
    } else {
      logger.log('error', message, error, meta)
    }
  }

  return logger
}

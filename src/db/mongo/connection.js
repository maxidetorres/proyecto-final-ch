const mongoose = require('mongoose')
const config = require('config')
const logger = require('../../logger').createLogger({ fileName: __filename })

module.exports.createConnectionMongoDb = () => {
  mongoose.connect(
        `mongodb+srv://${config.get('mongo.username')}:${config.get('mongo.password')}@${config.get('mongo.cluster')}.mongodb.net/${config.get('mongo.dbname')}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
  )
  const db = mongoose.connection
  db.on('error', (err) => logger.error('connection error: ', err))
  db.once('open', () => {
    logger.info('Connected successfully to Mongo atlas....')
  })
}

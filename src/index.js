const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const logger = require('../src/logger').createLogger({ fileName: __filename })
const packageInfo = require('../package.json')
/* const createConnectionMongoDb  = require('./db/mongo/connection').createConnectionMongoDb() */

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const config = require('config')

const routes = require('./routes')

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))

require('./utils/passport')

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log('SESSION', req.session)
  console.log('DATA USER', req.user)
  next()
})

const clusterIsActive = process.env.CLUSTER_IS_ACTIVE || config.get('cluster.isActive')
/* --------------------------------------------------------------------------- */
/* MASTER */
if (clusterIsActive && cluster.isMaster) {
  logger.info(`Números de CPU'S: ${numCPUs}`)
  logger.info(`PID MASTER ${process.pid}`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    logger.info(`Worker: ${worker.process.pid} died, ${new Date().toLocaleString()}`)
    cluster.fork()
  })
// eslint-disable-next-line brace-style
}

/* --------------------------------------------------------------------------- */
/* WORKERS */
else {
  app.use('/', routes)

  const port = process.env.PORT || config.get('port')
  app.listen(port, () => {
    logger.info(`Application ${packageInfo.name} started at port ${port}`, {
      type: 'application_start',
      applicationName: packageInfo.name,
      version: packageInfo.version,
      port
    })
  })
}

module.exports = app

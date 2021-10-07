const packageInfo = require('../package.json')
const express = require('express')

const app = express()

const routes = require('./routes')

app.use(express.json())

app.use('/', routes)

const port = process.env.PORT || 8080
app.listen(port, () => {
console.log(`Application ${packageInfo.name} started at port ${port}`, {
    type: 'application_start',
    applicationName: packageInfo.name,
    version: packageInfo.version,
    port
})
})


module.exports = app

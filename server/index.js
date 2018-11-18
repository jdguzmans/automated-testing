
require('dotenv').config()

const fs = require('fs')
const http = require('http')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { PORT, MONGODB_URI } = require('./config')

const app = express()
app.use(cors())
app.use(bodyParser.json())
// CODIGO REPORTE CARGUE DATOS
const path = require('path')
app.use(express.static(path.join(__dirname, 'ReportGAD')))
// FIN CODIGO
app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', PORT)

const mongoose = require('mongoose')

mongoose.promise = global.Promise

mongoose.connect(MONGODB_URI)
mongoose.set('debug', true)

// Add models
const models = fs.readdirSync('./models')
models.forEach(modelStr => {
  let modelName = modelStr.slice(0, -3)
  require('./models/' + modelName)
})

const routes = fs.readdirSync('./routes')
routes.forEach(routeStr => {
  let routeName = routeStr.slice(0, -3)
  let route = require('./routes/' + routeName)
  app.use('/' + routeName, route)
})

const server = http.createServer(app)
server.listen(PORT)
server.on('listening', () => {
  console.log(`server is running on port ${PORT}`)
})

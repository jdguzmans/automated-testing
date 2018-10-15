
require('dotenv').config()

const fs = require('fs')
const http = require('http')
const cors = require('cors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { PORT, STATIC_PATH, MONGODB_URI } = require('./config')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, STATIC_PATH)))
app.set('port', PORT)

const mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect(MONGODB_URI);
mongoose.set('debug', true);

// Add models
require('./models/Application');

const routes = fs.readdirSync('./routes')
routes.forEach(routeStr => {
  let routeName = routeStr.slice(0, -3)
  let route = require('./routes/' + routeName)
  app.use('/' + routeName, route)
})

const staticServer = http.createServer(app)
staticServer.listen(PORT)
staticServer.on('listening', () => {
  console.log(`server is running on port ${PORT}`)
})

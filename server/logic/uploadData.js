var mysql = require('mysql')
const mongoose = require('mongoose')
const Mockaroo = require('mockaroo')
const Application = mongoose.model('Application')
const UploadData = mongoose.model('UploadData')
const ReportGad = mongoose.model('ReportGad')
const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const queue = require('../functions/queue')

var exports = module.exports = {}

exports.uploadStart = async function (data) {
  await queue.sendUploadStartGADMessage(data.idRegister)
}

exports.getListTableDB = function (data) {
  return new Promise((resolve, reject) => {
    Application.findOne({
      _id: data.idApplication
    }).then((application) => {
      var connection = mysql.createConnection({
        host: application.host,
        user: application.userDb,
        password: application.passwordDB,
        database: application.nameDb,
        port: 3306
      })
      connection.connect(function (error) {
        if (error) {
          reject(error)
        }
      })

      if (application.nameDb === '') {
        reject(new Error('Este registro no tiene datos de conexion a la DB'))
      } else {
        connection.query('SHOW FULL TABLES FROM ' + application.nameDb, function (error, result) {
          if (error) {
            reject(error)
          } else {
            let dataReturn = {
              nameDb: application.nameDb,
              listTable: result
            }

            resolve(dataReturn)
          }
        }
        )
      }
    }).catch((next) => {
      reject(new Error('Se presento un error al consultar las tablas de la DB'))
    })
  })
}

exports.getRowTable = function (data) {
  return new Promise((resolve, reject) => {
    Application.findOne({
      _id: data.idApplication
    }).then((application) => {
      var connection = mysql.createConnection({
        host: application.host,
        user: application.userDb,
        password: application.passwordDB,
        database: application.nameDb,
        port: 3306
      })
      connection.connect(function (error) {
        if (error) {
          reject(error)
        }
      })

      if (application.nameDb === '') {
        reject(new Error('Este registro no tiene datos de conexion a la DB'))
      } else {
        connection.query('SHOW COLUMNS FROM ' + data.nameTableDb + ' FROM ' + application.nameDb, function (error, result) {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
        )
      }
    }).catch((next) => {
      reject(new Error('Se presento un error al consultar las tablas de la DB'))
    })
  })
}

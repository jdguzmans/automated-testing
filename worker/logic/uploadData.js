var mysql = require('mysql')
const mongoose = require('mongoose')
const Mockaroo = require('mockaroo')
const Application = mongoose.model('Application')
const UploadData = mongoose.model('UploadData')
const ReportGad = mongoose.model('ReportGad')
const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

var exports = module.exports = {}

exports.uploadStart = function (data) {
  return new Promise(async (resolve, reject) => {
    UploadData.findOne({
      _id: data.idRegister
    }).then(async (register) => {
      let field = []

      for (var key in register.dataJson) {
        field.push({
          name: key,
          type: register.dataJson[key]
        })
      }

      let client = new Mockaroo.Client({
        apiKey: '825fa840'
      })

      client.generate({
        count: register.numRegister,
        fields: field
      }).then(async (records) => {
        // CONEXION BASE DE DATOS
        Application.findOne({
          _id: register.application
        }).then(async (application) => {
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

          let dataReportGad = {
            'idTable': data.idRegister,
            'numRegister': 0,
            'registered': 0,
            'configRegister': register.numRegister
          }

          const finalReportGad = new ReportGad(dataReportGad)
          await finalReportGad.save()

          connection.query('SELECT COUNT(1) AS NUM FROM ' + register.nameTable, async function (error, result) {
            if (error) {
              reject(new Error())
            } else {
              finalReportGad.numRegister = result[0].NUM

              // CARGUE DE LA INFORMACION
              let cont = 0
              for (var key in records) {
                let fieldTable = ''
                let fieldTableCSV = ''
                let bindTable = ''
                let contRegister = ''
                let dataTable = []
                for (var name in records[key]) {
                  dataTable.push(records[key][name])
                  fieldTable += name + ','
                  fieldTableCSV += name + ';'
                  bindTable += '?,'
                  contRegister += records[key][name] + ';'
                }
                fieldTable = fieldTable.slice(0, -1)
                bindTable = bindTable.slice(0, -1)
                contRegister = contRegister.slice(0, -1)

                if (cont === 0) {
                  fs.appendFileSync(`tmp/${finalReportGad._id}.csv`, fieldTableCSV + 'stateRegister\r\n')
                  cont++
                }

                try {
                  connection.query(`INSERT INTO ${register.nameTable} (${fieldTable}) VALUES (${bindTable})`, dataTable, async (error, result) => {
                    let state = ''
                    if (error) {
                      state = false
                      console.log(error)
                    } else {
                      state = true
                    }
                    contRegister += ';' + state + '\r\n'
                    fs.appendFileSync(`tmp/${finalReportGad._id}.csv`, contRegister)
                    await fileStorage.saveGADReport(finalReportGad._id)

                    connection.query(`SELECT COUNT(1) AS NUM FROM ${register.nameTable}`, async function (error, result) {
                      if (error) {
                        reject(new Error())
                      } else {
                        finalReportGad.registered = result[0].NUM - finalReportGad.numRegister
                        await finalReportGad.save()
                        // fs.unlinkSync(`tmp/${finalReportGad._id}.csv`)
                        resolve('Proceso finaliado')
                      }
                    })
                  }
                  )
                } catch (e) {
                  records[key]['state'] = false
                }
              }
            }
          }
          )
        }).catch((next) => {
          reject(new Error('Se presento un error al consultar las tablas de la DB'))
        })
      })
    })
  })
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

const mysql = require('mysql')
const Mockaroo = require('mockaroo')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const { MONGODB_URI } = require('../config')

var exports = module.exports = {}

exports.uploadStart = function (_id) {
  return new Promise(async (resolve, reject) => {
    MongoClient.connect(MONGODB_URI, async (err, mongoClient) => {
      if (err) reject(err)
      else {
        const UploadData = mongoClient.db().collection('uploaddatas')
        const register = await UploadData.findOne({ _id: ObjectId(_id) })

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

        const records = await client.generate({
          count: register.numRegister,
          fields: field
        })

        const Application = mongoClient.db().collection('applications')
        const application = await Application.findOne({
          _id: ObjectId(register.application)
        })

        var connection = mysql.createConnection({
          host: application.host,
          user: application.userDb,
          password: application.passwordDB,
          database: application.nameDb,
          port: 3306
        })

        connection.connect(async function (error) {
          if (error) {
            reject(error)
          } else {
            let dataReportGad = {
              date: new Date().getTime(),
              'idTable': _id,
              'numRegister': 0,
              'registered': 0,
              'configRegister': register.numRegister
            }

            const ReportGad = mongoClient.db().collection('reportgads')
            const { ops } = await ReportGad.insertOne(dataReportGad)
            const { _id: id } = ops[0]

            connection.query('SELECT COUNT(1) AS NUM FROM ' + register.nameTable, async function (error, result) {
              if (error) {
                reject(new Error())
              } else {
                dataReportGad.numRegister = result[0].NUM

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
                    fs.appendFileSync(`tmp/${id}.csv`, fieldTableCSV + 'stateRegister\r\n')
                    cont++
                  }

                  await hola(connection, register, fieldTable, bindTable, dataTable, contRegister, dataReportGad, id, ReportGad)
                }
                resolve('Proceso finaliado')
              }
            })
          }
        })
      }
    })
  })
}

const hola = async (connection, register, fieldTable, bindTable, dataTable, contRegister, finalReportGad, id, ReportGad) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${register.nameTable} (${fieldTable}) VALUES (${bindTable})`, dataTable, async (error, result) => {
      let state = ''
      if (error) {
        state = false
        console.log(error)
      } else {
        state = true
      }
      contRegister += ';' + state + '\r\n'
      fs.appendFileSync(`tmp/${id}.csv`, contRegister)
      await fileStorage.saveGADReport(id)

      connection.query(`SELECT COUNT(1) AS NUM FROM ${register.nameTable}`, async function (error, result) {
        if (error) {
          reject(new Error())
        } else {
          finalReportGad.registered = result[0].NUM - finalReportGad.numRegister

          await ReportGad.updateOne({
            _id: ObjectId(id)
          }, {
            $set: finalReportGad
          })
          resolve()
        }
      })
    })
  })
}

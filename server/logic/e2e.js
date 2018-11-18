
const mongoose = require('mongoose')
const ReportsE2E = mongoose.model('ReportsE2E')
const fs = require('fs')

const fileStorage = require('../functions/fileStorage')

var exports = module.exports = {}

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const TestingE2E = mongoose.model('TestingE2E')

const { MONGODB_URI } = require('../config')

const queue = require('../functions/queue')

exports.createTest = async (body) => {
  return new Promise(async (resolve, reject) => {
    const finalTestingE2E = new TestingE2E(body)
    await finalTestingE2E.save()
    await queue.sendCreateE2ETestMessage(finalTestingE2E._id)
    resolve({ applicaton: finalTestingE2E })
  })
}

exports.findById = async (id) => {
  return new Promise((resolve, reject) => {
    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        const Reports = client.db().collection('reportse2es')
        const report = await Reports.findOne({ _id: ObjectId(id) })

        resolve(report)
      }
    })
  })
}

/**
 * Metodo para guardar el codigo escrito para el test
 * @param data
 * @param id
 * @returns {Promise<any>}
 */
exports.codeTestCafe = (data, id) => {
  return new Promise(async (resolve, reject) => {
    fs.writeFileSync(`tmp/${id}`, data.code)
    fileStorage.saveE2EFile(id)
    resolve()
  })
}

/**
 * Obtener el codigo fuente escrito para el test
 * @param id
 * @returns {Promise<any>}
 */
exports.getCodeTestCafe = function (id) {
  return new Promise(async (resolve, reject) => {
    const fileBuffer = await fileStorage.getE2EFile(id)
    fs.writeFileSync(`./tmp/${id}-code`, fileBuffer)
    const file = fs.readFileSync(`./tmp/${id}-code`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-code`)
    resolve(file)
  })
}

exports.getCodeMutant = function (id) {
  return new Promise(async (resolve, reject) => {
    const fileBuffer = await fileStorage.getMutantFile(id)
    fs.writeFileSync(`./tmp/${id}-mutant`, fileBuffer)
    const file = fs.readFileSync(`./tmp/${id}-mutant`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-mutant`)
    resolve(file)
  })
}

exports.getCodeMutode = function (id) {
  return new Promise(async (resolve, reject) => {
    const fileBuffer = await fileStorage.getMutantFile(id)
    fs.writeFileSync(`./tmp/${id}-mutode`, fileBuffer)
    const file = fs.readFileSync(`./tmp/${id}-mutode`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-mutode`)
    resolve(file)
  })
}

/**
 * Metodo para ejecutar el test
 * @param data
 * @returns {Promise<any>}
 */
exports.testCafeStart = (data) => {
  return new Promise(async (resolve, reject) => {
    const finalReportsE2E = new ReportsE2E(data)
    await finalReportsE2E.save()
    await queue.sendExecuteE2ETestMessage(finalReportsE2E._id)

    resolve()
  })
}

const mongoose = require('mongoose')
const ReportRandom = mongoose.model('ReportRandom')

const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI } = require('../config')

const queue = require('../functions/queue')

var exports = module.exports = {}

exports.findById = async (id) => {
  return new Promise((resolve, reject) => {
    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        const Reports = client.db().collection('reportrandoms')
        const report = await Reports.findOne({ _id: ObjectId(id) })

        resolve(report)
      }
    })
  })
}

exports.getCodeTestCafe = function (id) {
  return new Promise(async (resolve, reject) => {
    let files = []

    const fileBuffers = await fileStorage.getRandomFiles(id)

    fs.writeFileSync(`./tmp/${id}-code`, fileBuffers[0])
    files[0] = fs.readFileSync(`./tmp/${id}-code`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-code`)

    fs.writeFileSync(`./tmp/${id}-code`, fileBuffers[1])
    files[1] = fs.readFileSync(`./tmp/${id}-code`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-code`)

    resolve(files)
  })
}

/**
 * Metodo para ejecutar el test
 * @param data
 * @returns {Promise<any>}
 */
exports.testCafeStart = function (data) {
  return new Promise(async (resolve, reject) => {
    const finalReportRandom = new ReportRandom(data)
    await finalReportRandom.save()

    await queue.sendExecuteRandomTestMessage(finalReportRandom._id)

    resolve()
  })
}

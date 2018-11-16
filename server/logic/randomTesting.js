const mongoose = require('mongoose')
const ReportRandom = mongoose.model('ReportRandom')
const Application = mongoose.model('Application')
const exec = require('child_process').exec
const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI } = require('../config')

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
    const application = await Application.findOne({
      _id: data.idAppliRandom
    })

    const infoScreen = data.pantalla.split('x')
    const infoConfig = {
      baseUrl: application.toJSON().url,
      resizeWindow: {
        width: parseInt(infoScreen[0]),
        height: parseInt(infoScreen[1])
      },
      event: data.event
    }

    const finalReportRandom = new ReportRandom(data)
    await finalReportRandom.save()

    const nameReport = finalReportRandom.toJSON()._id

    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        const Snapshots = client.db().collection('snapshot')
        await Snapshots.insertOne({ _id: ObjectId(nameReport), snapshots: [] })

        fs.writeFileSync('tmp/config.json', JSON.stringify(infoConfig))

        let properties = data.navegador
        if (data.mode === 'true') {
          properties += ':headless'
        }

        fs.copyFileSync(`./templates/randomTesting.js`, `./tmp/randomTesting.js`)
        fs.copyFileSync(`./templates/structForm.js`, `./tmp/structForm.js`)

        exec(`testcafe ${properties} tmp/randomTesting.js --reporter html -s tmp/ -S tmp/ -p 'screenshots/\${FILE_INDEX}.png'`, async (er, stdout, stderr) => {
          if (er) {
            console.log('ERROR')
            console.log(er)
            console.log('STDERR')
            console.log(stderr)
            reject(er)
          } else {
            fs.unlinkSync('tmp/config.json')
            fs.unlinkSync('tmp/randomTesting.js')
            fs.unlinkSync('tmp/structForm.js')

            const filesVR = fs.readdirSync(`./tmp/screenshots`)

            const picturesVR = filesVR.filter(file => {
              const stat = fs.statSync(`./tmp/screenshots/${file}`)
              return stat.isFile()
            })

            for (let picture of picturesVR) {
              await fileStorage.saveRandomScreenshot(nameReport, picture)
              fs.unlinkSync(`./tmp/screenshots/${picture}`)
            }

            const screenshotsLength = picturesVR.length

            const ReportsRandom = client.db().collection('reportrandoms')

            await ReportsRandom.updateOne({
              _id: ObjectId(nameReport)
            }, {
              $set: { screenshotsLength }
            })

            fs.appendFileSync(`tmp/${nameReport}.html`, stdout)
            await fileStorage.saveRandomReport(nameReport)
            fs.unlinkSync(`tmp/${nameReport}.html`)

            resolve()
          }
        })
      }
    })
  })
}

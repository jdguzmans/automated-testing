
const exec = require('child_process').exec
const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI } = require('../config')

var exports = module.exports = {}

/**
 * Metodo para ejecutar el test
 * @param data
 * @returns {Promise<any>}
 */
exports.executeTest = function (_id) {
  return new Promise(async (resolve, reject) => {
    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        console.log(_id)
        const ReportsRandom = client.db().collection('reportrandoms')
        const report = await ReportsRandom.findOne({
          _id: ObjectId(_id)
        })

        const infoScreen = report.pantalla.split('x')

        const Application = client.db().collection('applications')
        const application = await Application.findOne({
          _id: ObjectId(report.idAppliRandom)
        })

        const infoConfig = {
          baseUrl: application.url,
          resizeWindow: {
            width: parseInt(infoScreen[0]),
            height: parseInt(infoScreen[1])
          }
        }

        fs.writeFileSync('tmp/config.json', JSON.stringify(infoConfig))

        let properties = report.navegador
        if (report.mode === 'true') {
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
              await fileStorage.saveRandomScreenshot(_id, picture)
              fs.unlinkSync(`./tmp/screenshots/${picture}`)
            }

            const screenshotsLength = picturesVR.length

            const ReportsRandom = client.db().collection('reportrandoms')

            await ReportsRandom.updateOne({
              _id: ObjectId(_id)
            }, {
              $set: { screenshotsLength }
            })

            fs.appendFileSync(`tmp/${_id}.html`, stdout)
            await fileStorage.saveRandomReport(_id)
            fs.unlinkSync(`tmp/${_id}.html`)

            resolve()
          }
        })
      }
    })
  })
}

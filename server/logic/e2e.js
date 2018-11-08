
const mongoose = require('mongoose')
const ReportsE2E = mongoose.model('ReportsE2E')
const Application = mongoose.model('Application')
const exec = require('child_process').exec
const fs = require('fs')
const resemble = require('node-resemble-js')

const fileStorage = require('../functions/fileStorage')

var exports = module.exports = {}

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const TestingE2E = mongoose.model('TestingE2E')

const { MONGODB_URI } = require('../config')

exports.createTest = async (body) => {
  return new Promise(async (resolve, reject) => {
    const finalTestingE2E = new TestingE2E(body)
    await finalTestingE2E.save()
    await fileStorage.generateE2ETemplate(finalTestingE2E._id)

    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        const Snapshots = client.db().collection('snapshot')
        await Snapshots.insertOne({ _id: ObjectId(finalTestingE2E._id), snapshots: [] })
      }
      resolve({ applicaton: finalTestingE2E })
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
  return new Promise(async(resolve, reject) => {
    const fileBuffer = await fileStorage.getE2EFile(id)
    fs.writeFileSync(`./tmp/${id}`, fileBuffer)
    const file = fs.readFileSync(`./tmp/${id}`, 'utf8')
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
    const application = await Application.findOne({
      _id: data.idApplication
    })

    let infoScreen = data.pantalla.split('x')
    let infoConfig = {
      baseUrl: application.toJSON().url,
      resizeWindow: {
        width: parseInt(infoScreen[0]),
        height: parseInt(infoScreen[1])
      }
    }

    const finalReportsE2E = new ReportsE2E(data)
    await finalReportsE2E.save()

    const nameReport = finalReportsE2E.toJSON()._id

    fs.writeFileSync('tmp/config.json', JSON.stringify(infoConfig))

    let properties = data.navegador
    if (data.mode === 'true') {
      properties += ':headless'
    }

    const fileBuffer = await fileStorage.getE2EFile(data.idTest)
    fs.writeFileSync(`./tmp/${nameReport}.js`, fileBuffer)

    exec(`testcafe ${properties} tmp/${nameReport}.js --reporter html -s tmp/ -S tmp/ -p 'screenshots/\${FILE_INDEX}.png'`, async (er, stdout, stderr) => {
      if (er) {
        console.log('ERROR')
        console.log(er)
        console.log('STDERR')
        console.log(stderr)
        reject(er)
      } else {
        console.log(stdout)
        fs.appendFileSync(`tmp/${nameReport}.html`, stdout)
        await fileStorage.saveE2EReport(nameReport)

        if (stdout) {
          exec(`cd tmp && mutode ./${nameReport}.js`, async (err, stdout, stderr) => {
            if (err) throw err
            else {
              const filesMutation = fs.readdirSync(`tmp/.mutode`)

              for (let file of filesMutation) {
                if (file.startsWith('mutants')) {
                  await fileStorage.saveE2EMutationMutantLog(nameReport, file)
                } else {
                  await fileStorage.saveE2EMutationMutodeLog(nameReport, file)
                }
                fs.unlinkSync(`tmp/.mutode/${file}`)
              }

              const filesVR = fs.readdirSync(`./tmp/screenshots`)

              const picturesVR = filesVR.filter(file => {
                const stat = fs.statSync(`./tmp/screenshots/${file}`)
                return stat.isFile()
              })

              for (let picture of picturesVR) {
                await fileStorage.saveE2EScreenshot(nameReport, picture)
              }

              MongoCLient.connect(MONGODB_URI, async (err, client) => {
                if (err) throw err
                else {
                  const time = new Date().getTime()
                  const Snapshots = client.db().collection('snapshot')
                  let { snapshots } = await Snapshots.findOne({_id: ObjectId(data.idTest)})

                  snapshots.push({ report: nameReport, time, pictures: picturesVR })
                  await Snapshots.updateOne({ _id: ObjectId(data.idTest) }, {
                    $set: { snapshots }
                  })

                  if (snapshots.length !== 1) {
                    const { pictures: pictures1, report: report1 } = snapshots[(snapshots.length - 2)]
                    const { pictures: pictures2, report: report2 } = snapshots[(snapshots.length - 1)]

                    for (let pic1 of pictures1) {
                      for (let pic2 of pictures2) {
                        if (pic1 === pic2) {
                          await comparePictures({ pic: pic1, report: report1 }, { pic: pic2, report: report2 })
                        }
                      }
                    }
                  }
                }
              })
            }
          })
        }
      }
    })
  })
}

const comparePictures = (sn1, sn2) => {
  const { pic: pic1, report: report1 } = sn1
  const { pic: pic2, report: report2 } = sn2

  return new Promise(async (resolve, reject) => {
    const file1 = await fileStorage.getE2EScreenshot(report1, pic1)
    const file2 = await fileStorage.getE2EScreenshot(report2, pic2)

    resemble(file1)
    .compareTo(file2)
    .onComplete(async data => {
      const { getDiffImageAsJPEG } = data
      const differences = getDiffImageAsJPEG()
      fs.writeFileSync(`/tmp/hola.png`, differences)
      await fileStorage.saveE2EScreenshotComparation(report2, pic2, differences)
      resolve()
    })
  })
}

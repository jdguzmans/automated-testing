const router = require('express').Router()
const mongoose = require('mongoose')
const ReportsE2E = mongoose.model('ReportsE2E')
const Application = mongoose.model('Application')
const TestingE2E = mongoose.model('TestingE2E')
const exec = require('child_process').exec
const fs = require('fs')
const resemble = require('node-resemble-js')

var exports = module.exports = {}

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI, STATIC_PATH } = require('../config')

/**
 * Metodo para guardar el codigo escrito para el test
 * @param data
 * @param id
 * @returns {Promise<any>}
 */
exports.codeTestCafe = function (data, id) {
  return new Promise((resolve, reject) => {
    fs.writeFile('TestingE2E/test/' + id + '.js', data.code, (err) => {
      if (err) throw err
      console.log('The "data to append" was appended to file!')
    })
    resolve()
  })
}

/**
 * Obtener el codigo fuente escrito para el test
 * @param id
 * @returns {Promise<any>}
 */
exports.getCodeTestCafe = function (id) {
  return new Promise((resolve, reject) => {
    fs.readFile('TestingE2E/test/' + id + '.js', 'utf8', function (err, data) {
      resolve(data)
    })
  })
}

/**
 * Metodo para realizar la configuracion necesaria para la ejecucion de la prueba
 * @param data
 * @returns {Promise<any>}
 */
exports.configTest = function (data) {
  return new Promise((resolve, reject) => {
    fs.exists('TestingE2E/test/' + data.idTest + '.js', function (exists) {
      if (exists) {
        Application.findOne({
          _id: data.idApplication
        }).then((application) => {
          let infoScreen = data.pantalla.split('x')
          let infoConfig = {
            baseUrl: application.toJSON().url,
            resizeWindow: {
              width: parseInt(infoScreen[0]),
              height: parseInt(infoScreen[1])
            }
          }

          try {
            fs.writeFileSync('TestingE2E/config.json', JSON.stringify(infoConfig))
            resolve(true)
          } catch (err) {
            reject('Se presento un error al configurar la prueba a ejecutar')
          }
        })
      } else {
        reject('Esta prueba no ha sido escrita, por favor escriba la prueba a ejecutar')
      }
    })
  })
}

/**
 * Metodo para ejecutar el test
 * @param data
 * @returns {Promise<any>}
 */
exports.testCafeStart = function (data) {
  return new Promise((resolve, reject) => {
    let properties = data.navegador
    if (data.mode === 'true') {
      properties += ':headless'
    }

    const finalReportsE2E = new ReportsE2E(data)
    finalReportsE2E.save()
            .then()
            .catch()

    const nameReport = finalReportsE2E.toJSON()._id

    exec('testcafe ' + properties + ' TestingE2E/test/' + data.idTest + '.js --reporter html -s screenshots -p "TestingE2E/' + nameReport + '/${FILE_INDEX}.png"', async (er, stdout, stderr) => {
      if (er) {
        console.log('ERROR')
        console.log(er)
        console.log('STDERR')
        console.log(stderr)
        reject(er)
      }
      if (stdout) {
        if (!fs.existsSync(`./static/vr/e2e/${data.idTest}`)) await createScreenshotsDir(data.idTest)

        let dir = `${STATIC_PATH}/vr/e2e/${data.idTest}`
        dir = `${dir}/snapshots/${nameReport}`
        fs.mkdirSync(dir)

        const files = fs.readdirSync(`./screenshots/TestingE2E/${nameReport}`)

        const pictures = files.filter(file => {
          const filePath = `./screenshots/TestingE2E/${nameReport}/${file}`
          const stat = fs.statSync(filePath)
          return stat.isFile()
        })

        for (let picture of pictures) {
          const filePath = `./screenshots/TestingE2E/${nameReport}/${picture}`

          fs.copyFileSync(filePath, `${STATIC_PATH}/vr/e2e/${data.idTest}/snapshots/${nameReport}/p${picture}`)
        }

        MongoCLient.connect(MONGODB_URI, async (err, client) => {
          if (err) throw err
          else {
            const time = new Date().getTime()
            const Snapshots = client.db().collection('snapshot')
            let { snapshots } = await Snapshots.findOne({_id: ObjectId(data.idTest)})

            const picturesDB = pictures.map(picture => {
              return `p${picture}`
            })

            snapshots.push({ report: nameReport, time, pictures: picturesDB })
            await Snapshots.updateOne({ _id: ObjectId(data.idTest) }, {
              $set: { snapshots }
            })

            if (snapshots.length !== 1) {
              fs.mkdirSync(`${STATIC_PATH}/vr/e2e/${data.idTest}/executions/${nameReport}`)

              const { pictures: pictures1, report: report1 } = snapshots[(snapshots.length - 2)]
              const { pictures: pictures2, report: report2 } = snapshots[(snapshots.length - 1)]

              for (let pic1 of pictures1) {
                for (let pic2 of pictures2) {
                  if (pic1 === pic2) {
                    await comparePictures(`${STATIC_PATH}/vr/e2e/${data.idTest}`, { pic: pic1, report: report1 }, { pic: pic2, report: report2 })
                  }
                }
              }
            }
          }
        })

        fs.appendFile('TestingE2E/Report/' + nameReport + '.html', stdout, (err) => {
          if (err) {
            reject('Se presento un error al generar el reporte')
          };
          resolve('La prueba se realizo con exito')
        })
      }
    })
  })
}

const createScreenshotsDir = (id) => {
  return new Promise((resolve, reject) => {
    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) reject(err)
      else {
        let Snapshots = client.db().collection('snapshot')

        const { ops } = await Snapshots.insertOne({_id: ObjectId(id), snapshots: []})
        const { _id } = ops[0]

        let dir = `${STATIC_PATH}/vr/e2e/${_id.toString()}`
        fs.mkdirSync(dir)

        fs.mkdirSync(`${dir}/snapshots`)

        fs.mkdirSync(`${dir}/executions`)

        resolve()
      }
    })
  })
}

const comparePictures = (path, sn1, sn2) => {
  const { pic: pic1, report: report1 } = sn1
  const { pic: pic2, report: report2 } = sn2

  return new Promise((resolve, reject) => {
    const snapshot1 = fs.readFileSync(`${path}/snapshots/${report1}/${pic1}`)
    const snapshot2 = fs.readFileSync(`${path}/snapshots/${report2}/${pic2}`)

    resemble(snapshot1)
    .compareTo(snapshot2)
    .onComplete(data => {
      const { getDiffImageAsJPEG } = data
      const differences = getDiffImageAsJPEG()
      fs.writeFileSync(`${path}/executions/${report2}/${pic2}`, differences)
      resolve()
    })
  })
}

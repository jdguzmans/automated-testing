
const exec = require('child_process').exec
const fs = require('fs')
const resemble = require('node-resemble-js')

const fileStorage = require('../functions/fileStorage')

var exports = module.exports = {}

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI } = require('../config')

exports.createTest = async (_id) => {
  return new Promise(async (resolve, reject) => {
    await fileStorage.generateE2ETemplate(_id)

    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        const Snapshots = client.db().collection('snapshot')
        await Snapshots.insertOne({ _id: ObjectId(_id), snapshots: [] })
      }
      resolve()
    })
  })
}

exports.executeTest = (_id) => {
  return new Promise(async (resolve, reject) => {
    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) reject(err)
      else {
        const ReportsE2E = client.db().collection('reportse2es')
        const report = await ReportsE2E.findOne({
          _id: ObjectId(_id)
        })

        const infoScreen = report.pantalla.split('x')

        const TestE2E = client.db().collection('testinge2es')

        const test = await TestE2E.findOne({
          _id: ObjectId(report.idTest)
        })

        const Application = client.db().collection('applications')
        const application = await Application.findOne({
          _id: ObjectId(test.application)
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

        const fileBuffer = await fileStorage.getE2EFile(report.idTest)

        fs.writeFileSync(`./tmp/${_id}.js`, fileBuffer)

        exec(`testcafe ${properties} tmp/${_id}.js --reporter html -s tmp/ -S tmp/ -p 'screenshots/\${FILE_INDEX}.png'`, async (er, stdout, stderr) => {
          if (er) {
            console.log('ERROR')
            console.log(er)
            console.log('STDERR')
            console.log(stderr)
            reject(er)
          } else {
            fs.unlinkSync('tmp/config.json')

            fs.appendFileSync(`tmp/${_id}.html`, stdout)
            await fileStorage.saveE2EReport(_id)
            fs.unlinkSync(`tmp/${_id}.html`)

            exec(`cd tmp && mutode ./${_id}.js`, async (err, stdout, stderr) => {
              if (err) {
                console.log('ERROR')
                console.log(err)
                console.log('STDERR')
                console.log(stderr)
                throw (err)
              } else {
                fs.unlinkSync(`./tmp/${_id}.js`)
                const filesMutation = fs.readdirSync(`tmp/.mutode`)

                for (let file of filesMutation) {
                  if (file.startsWith('mutants')) {
                    await fileStorage.saveE2EMutationMutantLog(_id, file)
                  } else {
                    await fileStorage.saveE2EMutationMutodeLog(_id, file)
                  }
                  fs.unlinkSync(`tmp/.mutode/${file}`)
                }

                const filesVR = fs.readdirSync(`./tmp/screenshots`)

                const picturesVR = filesVR.filter(file => {
                  const stat = fs.statSync(`./tmp/screenshots/${file}`)
                  return stat.isFile()
                })

                for (let picture of picturesVR) {
                  await fileStorage.saveE2EScreenshot(_id, picture)
                  fs.unlinkSync(`./tmp/screenshots/${picture}`)
                }

                MongoCLient.connect(MONGODB_URI, async (err, client) => {
                  if (err) throw err
                  else {
                    const time = new Date().getTime()

                    const screenshotsLength = picturesVR.length

                    const ReportsE2E = client.db().collection('reportse2es')
                    await ReportsE2E.updateOne({
                      _id: ObjectId(_id)
                    }, {
                      $set: { screenshotsLength }
                    })

                    const Snapshots = client.db().collection('snapshot')
                    let { snapshots } = await Snapshots.findOne({ _id: ObjectId(report.idTest) })

                    snapshots.push({ report: _id, time, pictures: picturesVR })
                    await Snapshots.updateOne({ _id: ObjectId(report.idTest) }, {
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
                    resolve()
                  }
                })
              }
            })
          }
        })
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

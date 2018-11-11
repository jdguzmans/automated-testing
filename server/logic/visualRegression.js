
const captureElectron = require('capture-electron')
const capturePhantom = require('capture-phantomjs')
const resemble = require('node-resemble-js')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const { MONGODB_URI } = require('../config')

module.exports = {
  getAllSnapshots: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, (err, client) => {
        if (err) reject(err)
        else {
          let Snapshots = client.db().collection('snapshot')
          Snapshots.find({ url: { $exists: true } }).toArray((err, points) => {
            if (err) reject(err)
            else resolve(points)
            client.close()
          })
        }
      })
    })
  },

  getSnapshotById: (testId, snapshotId) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          const Snapshots = client.db().collection('snapshot')
          let { snapshots } = await Snapshots.findOne({ _id: ObjectId(testId) })

          let sn1
          let sn2
          for (let i = 0; i < snapshots.length; i++) {
            sn1 = snapshots[i]
            const { report } = sn1
            if (report.toString() === snapshotId && i !== 0) {
              sn2 = snapshots[i - 1]
            }
          }
          resolve({ snapshots: { sn1, sn2 }, testId })
        }
      })
    })
  },

  createSnapshot: async (name, url) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          const time = new Date().getTime()
          let Snapshots = client.db().collection('snapshot')

          const { ops } = await Snapshots.insertOne({ name,
            url,
            snapshots: [
              time
            ]
          })
          const { _id } = ops[0]

          const electronScreenshot = await captureElectron({ url })
          await fileStorage.saveRegressionElectronSnapshot(electronScreenshot, _id, time)

          const phantomScreenshot = await capturePhantom({ url })
          await fileStorage.saveRegressionPhantomSnapshot(phantomScreenshot, _id, time)

          resemble(electronScreenshot)
            .compareTo(phantomScreenshot)
            .onComplete(async data => {
              const { getDiffImageAsJPEG } = data
              const differences = getDiffImageAsJPEG()
              await fileStorage.saveRegressionElectronPhantomDifferencesSnapshot(differences, _id, time)

              resolve()
            })
        }
      })
    })
  },

  executeSnapshot: (_id) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          const Snapshots = client.db().collection('snapshot')
          let { snapshots, url } = await Snapshots.findOne({ _id: ObjectId(_id) })

          const time = new Date().getTime()

          const electronScreenshot = await captureElectron({ url })
          await fileStorage.saveRegressionElectronSnapshot(electronScreenshot, _id, time)

          const phantomScreenshot = await capturePhantom({ url })
          await fileStorage.saveRegressionPhantomSnapshot(phantomScreenshot, _id, time)

          snapshots.push(time)
          await Snapshots.updateOne({ _id: ObjectId(_id) }, {
            $set: { snapshots }
          })

          resemble(electronScreenshot)
            .compareTo(phantomScreenshot)
            .onComplete(async data => {
              const { getDiffImageAsJPEG } = data
              const differences = getDiffImageAsJPEG()
              await fileStorage.saveRegressionElectronPhantomDifferencesSnapshot(differences, _id, time)

              const snapshot1 = snapshots[(snapshots.length - 2)]
              const snapshot2 = snapshots[(snapshots.length - 1)]

              const snapshot1Electron = await fileStorage.getRegressionElectronSnapshot(_id, snapshot1)
              // await fs.writeFileSync(`./tmp/${_id}-elec1`, snapshot1ElectronBuffer)
              // const snapshot1Electron = fs.readFileSync(`./tmp/${_id}-elec1`)

              const snapshot2Electron = await fileStorage.getRegressionElectronSnapshot(_id, snapshot2)
              // await fs.writeFileSync(`./tmp/${_id}-elec2`, snapshot2ElectronBuffer)
              // const snapshot2Electron = fs.readFileSync(`./tmp/${_id}-elec2`)

              console.log(snapshot1Electron)
              console.log(snapshot2Electron)

              console.log(0)
              resemble(snapshot1Electron)
                .compareTo(snapshot2Electron)
                .onComplete(async data => {
                  const { getDiffImageAsJPEG } = data

                  const differences = getDiffImageAsJPEG()
                  await fileStorage.saveRegressionElectronExecution(differences, _id, time)

                  const snapshot1Phantom = await fileStorage.getRegressionPhantomSnapshot(_id, snapshot1)

                  const snapshot2Phantom = await fileStorage.getRegressionPhantomSnapshot(_id, snapshot2)

                  console.log(snapshot1Phantom)
                  console.log(snapshot2Phantom)

                  resemble(snapshot1Phantom)
                    .compareTo(snapshot2Phantom)
                    .onComplete(async data => {
                      console.log(4)

                      const { getDiffImageAsJPEG } = data
                      const differences = getDiffImageAsJPEG()
                      await fileStorage.saveRegressionPhantomExecution(differences, _id, time)

                      console.log(5)

                      resolve()
                    })
                })
            })
        }
      })
    })
  }
}

// const prueba = async () => {
//   const snapshotElectron = fs.readFileSync(`${STATIC_PATH}/5bbacd3423fd2b7519feed12/snapshots/1539015967250/electron.png`)
//   const snapshotPhantom = fs.readFileSync(`${STATIC_PATH}/5bbacd3423fd2b7519feed12/snapshots/1539015967250/phantom.png`)

//   resemble(snapshotElectron)
//   .compareTo(snapshotPhantom)
//   .onComplete(data => {
//     const hola = data.getDiffImageAsJPEG()
//     fs.writeFileSync(`${STATIC_PATH}/5bbacd3423fd2b7519feed12/snapshots/1539015967250/browserDifferences.jpeg`, hola)
//     console.log('ya')
//   })
// }

// prueba()


const captureElectron = require('capture-electron')
const capturePhantom = require('capture-phantomjs')
const resemble = require('node-resemble-js')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const fileStorage = require('../functions/fileStorage')

const { MONGODB_URI } = require('../config')

module.exports = {
  createSnapshot: async (_id) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          let Snapshots = client.db().collection('snapshot')

          const { url, snapshots } = await Snapshots.findOne({ _id: ObjectId(_id) })
          const time = snapshots[0]

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

              const snapshot2Electron = await fileStorage.getRegressionElectronSnapshot(_id, snapshot2)

              resemble(snapshot1Electron)
                .compareTo(snapshot2Electron)
                .onComplete(async data => {
                  const { getDiffImageAsJPEG } = data

                  const differences = getDiffImageAsJPEG()
                  await fileStorage.saveRegressionElectronExecution(differences, _id, time)

                  const snapshot1Phantom = await fileStorage.getRegressionPhantomSnapshot(_id, snapshot1)

                  const snapshot2Phantom = await fileStorage.getRegressionPhantomSnapshot(_id, snapshot2)

                  resemble(snapshot1Phantom)
                    .compareTo(snapshot2Phantom)
                    .onComplete(async data => {
                      const { getDiffImageAsJPEG } = data
                      const differences = getDiffImageAsJPEG()
                      await fileStorage.saveRegressionPhantomExecution(differences, _id, time)

                      resolve()
                    })
                })
            })
        }
      })
    })
  }
}

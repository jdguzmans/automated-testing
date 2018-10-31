
const captureElectron = require('capture-electron')
const capturePhantom = require('capture-phantomjs')
const resemble = require('node-resemble-js')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI, STATIC_PATH } = require('../config')

module.exports = {
  createSnapshot: async (name, url) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          let Snapshots = client.db().collection('snapshot')

          const { ops } = await Snapshots.insertOne({name, url, snapshots: []})
          const { _id } = ops[0]

          let dir = `${STATIC_PATH}/${_id.toString()}`
          fs.mkdirSync(dir)

          dir = `${dir}/snapshots`
          fs.mkdirSync(dir)

          const time = new Date().getTime()
          dir = `${dir}/${time}`
          fs.mkdirSync(dir)

          const electronScreenshot = await captureElectron({ url })
          fs.writeFileSync(`${dir}/electron.png`, electronScreenshot)

          const phantomScreenshot = await capturePhantom({ url })
          fs.writeFileSync(`${dir}/phantom.png`, phantomScreenshot)

          resemble(electronScreenshot)
          .compareTo(phantomScreenshot)
          .onComplete(async data => {
            const { getDiffImageAsJPEG } = data
            const differences = getDiffImageAsJPEG()
            fs.writeFileSync(`${dir}/browserDifferences.jpeg`, differences)

            await Snapshots.updateOne({ _id }, {
              $set: { snapshots: [ time ] }
            })

            resolve()
          })
        }
      })
    })
  },
  getAllSnapshots: () => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, (err, client) => {
        if (err) reject(err)
        else {
          let Snapshots = client.db().collection('snapshot')
          Snapshots.find({}).toArray((err, points) => {
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
          let { snapshots } = await Snapshots.findOne({_id: ObjectId(testId)})

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
  executeSnapshot: (_id) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          const Snapshots = client.db().collection('snapshot')
          let { snapshots, url } = await Snapshots.findOne({_id: ObjectId(_id)})

          let dir = `${STATIC_PATH}/${_id}/snapshots`

          const time = new Date().getTime()
          dir = `${dir}/${time}`
          fs.mkdirSync(dir)

          const electronScreenshot = await captureElectron({ url })
          fs.writeFileSync(`${dir}/electron.png`, electronScreenshot)

          const phantomScreenshot = await capturePhantom({ url })
          fs.writeFileSync(`${dir}/phantom.png`, phantomScreenshot)

          snapshots.push(time)
          await Snapshots.updateOne({ _id: ObjectId(_id) }, {
            $set: { snapshots }
          })

          resemble(electronScreenshot)
          .compareTo(phantomScreenshot)
          .onComplete(data => {
            const { getDiffImageAsJPEG } = data
            const differences = getDiffImageAsJPEG()
            fs.writeFileSync(`${dir}/browserDifferences.jpeg`, differences)

            dir = `${STATIC_PATH}/${_id}/executions`
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
            dir = `${dir}/${time}`
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)

            const snapshot1 = snapshots[(snapshots.length - 2)]
            const snapshot2 = snapshots[(snapshots.length - 1)]

            const snapshot1Electron = fs.readFileSync(`${STATIC_PATH}/${_id}/snapshots/${snapshot1}/electron.png`)
            const snapshot2Electron = fs.readFileSync(`${STATIC_PATH}/${_id}/snapshots/${snapshot2}/electron.png`)

            const snapshot1Phantom = fs.readFileSync(`${STATIC_PATH}/${_id}/snapshots/${snapshot1}/phantom.png`)
            const snapshot2Phantom = fs.readFileSync(`${STATIC_PATH}/${_id}/snapshots/${snapshot2}/phantom.png`)

            resemble(snapshot1Electron)
            .compareTo(snapshot2Electron)
            .onComplete(data => {
              const { getDiffImageAsJPEG } = data
              const differences = getDiffImageAsJPEG()
              fs.writeFileSync(`${dir}/electron.jpeg`, differences)

              resemble(snapshot1Phantom)
              .compareTo(snapshot2Phantom)
              .onComplete(data => {
                const { getDiffImageAsJPEG } = data
                const differences = getDiffImageAsJPEG()
                fs.writeFileSync(`${dir}/phantom.jpeg`, differences)
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

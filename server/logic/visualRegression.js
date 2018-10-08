
const captureElectron = require('capture-electron')
const capturePhantom = require('capture-phantomjs')

const fs = require('fs')
const MongoCLient = require('mongodb').MongoClient
const { MONGODB_URI, STATIC_PATH } = require('../config')

module.exports = {
  createSnapshot: async (name, url) => {
    return new Promise((resolve, reject) => {
      MongoCLient.connect(MONGODB_URI, async (err, client) => {
        if (err) reject(err)
        else {
          let Regressions = client.db().collection('regression')

          const { ops } = await Regressions.insertOne({name, url, snapshots: []})
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
          fs.writeFileSync(`${dir}/phantomjs.png`, phantomScreenshot)

          await Regressions.updateOne({ _id }, {
            $set: { snapshots: [ time ] }
          })

          resolve()
        }
      })
    })
  }
}

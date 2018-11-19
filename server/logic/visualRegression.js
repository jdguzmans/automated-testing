
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const queue = require('../functions/queue')

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

          await queue.sendCreateVRSnapshotMessage(_id)
          resolve()
        }
      })
    })
  },

  executeSnapshot: async (_id) => {
    await queue.sendExecuteVRSnapshotMessage(_id)
  }
}

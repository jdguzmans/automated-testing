const express = require('express')
const router = express.Router()
const visualRegressionLogic = require('../logic/visualRegression')

router.post('/createSnapshot', async (req, res, next) => {
  const { body: { name, url } } = req
  await visualRegressionLogic.createSnapshot(name, url)
  res.sendStatus(200)
})

router.get('/', async (req, res, next) => {
  const snapshots = await visualRegressionLogic.getAllSnapshots()
  res.send(snapshots)
})

router.get('/byIds/:testId/:snapshotId', async (req, res, next) => {
  const { params: { testId, snapshotId } } = req
  const regressions = await visualRegressionLogic.getSnapshotById(testId, snapshotId)
  res.send(regressions)
})

router.post('/execute', async (req, res, next) => {
  const { body: { _id } } = req
  await visualRegressionLogic.executeSnapshot(_id)
  res.sendStatus(200)
})

module.exports = router

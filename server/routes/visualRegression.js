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
  return snapshots
})

module.exports = router

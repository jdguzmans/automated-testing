const mongoose = require('mongoose')
const router = require('express').Router()
const ReportRandom = mongoose.model('ReportRandom')
const randomTesting = require('../logic/randomTesting')

router.post('/', async (req, res, next) => {
  const { body } = req

  const response = await randomTesting.createTest(body)
  res.status(200).json(response)
})

router.post('/matrizTest', async (req, res, next) => {
  const { body } = req

  const testStart = await randomTesting.testCafeStart(body)
  res.status(200).json({
    message: {
      name: testStart
    }
  })
})

router.get('/', (req, res, next) => {
  return ReportRandom.find()
    .sort({ createdAt: 'descending' })
    .then((randomTestings) => res.json({ randomTestings: randomTestings.map(randomTesting => randomTesting.toJSON()) }))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id

  return ReportRandom.findById(id, (err, testingsE2E) => {
    if (err) {
      return res.sendStatus(404)
    } else if (testingsE2E) {
      req.testingsE2E = testingsE2E
      return res.json({ testingsE2E: req.testingsE2E })
    }
  }).catch(next)
})

module.exports = router

const mongoose = require('mongoose')
const router = require('express').Router()
const TestingE2E = mongoose.model('TestingE2E')
const e2e = require('../logic/e2e')

router.post('/', async (req, res, next) => {
  const { body } = req

  if (!body.name) {
    return res.status(422).json({
      errors: {
        name: 'is required'
      }
    })
  }

  if (!body.application) {
    return res.status(422).json({
      errors: {
        application: 'is required'
      }
    })
  }

  if (!body.description) {
    return res.status(422).json({
      errors: {
        description: 'is required'
      }
    })
  }

  const response = await e2e.createTest(body)
  res.status(200).json(response)
})

router.get('/', (req, res, next) => {
  return TestingE2E.find()
    .sort({ createdAt: 'descending' })
    .then((testingsE2E) => res.json({ testingsE2E: testingsE2E.map(testingE2E => testingE2E.toJSON()) }))
    .catch(next)
})

router.post('/matrizTest', async (req, res, next) => {
  const { body } = req

  const testStart = await e2e.testCafeStart(body)
  res.status(200).json({
    message: {
      name: testStart
    }
  })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id

  return TestingE2E.findById(id, (err, testingsE2E) => {
    if (err) {
      return res.sendStatus(404)
    } else if (testingsE2E) {
      req.testingsE2E = testingsE2E
      return res.json({ testingsE2E: req.testingsE2E })
    }
  }).catch(next)
})

router.patch('/dataCode/:id', async (req, res, next) => {
  const { body } = req
  await e2e.codeTestCafe(body, req.params.id)
  res.sendStatus(200)
})

router.get('/dataCode/:id', async (req, res, next) => {
  const result = await e2e.getCodeTestCafe(req.params.id)
  res.json({ result: result })
})

router.get('/mutation/mutant/:id', async (req, res, next) => {
  const result = await e2e.getCodeMutant(req.params.id)
  res.json({ result: result })
})

router.get('/mutation/mutode/:id', async (req, res, next) => {
  const result = await e2e.getCodeMutode(req.params.id)
  res.json({ result: result })
})

router.patch('/:id', async (req, res, next) => {
  const testingsE2E = await TestingE2E.findOne({
    _id: req.params.id
  })

  const { body } = req
  req.testingsE2E = testingsE2E

  if (typeof body.name !== 'undefined') {
    req.testingsE2E.name = body.name
  }

  if (typeof body.application !== 'undefined') {
    req.testingsE2E.application = body.application
  }

  if (typeof body.description !== 'undefined') {
    req.testingsE2E.description = body.description
  }

  await req.testingsE2E.save()
  res.json({ testingsE2E: req.testingsE2E.toJSON() })
})

module.exports = router

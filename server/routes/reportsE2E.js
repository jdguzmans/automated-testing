const mongoose = require('mongoose')
const router = require('express').Router()
const ReportsE2E = mongoose.model('ReportsE2E')
const e2e = require('../logic/e2e')

router.get('/', (req, res, next) => {
  return ReportsE2E.find()
    .sort({ createdAt: 'descending' })
    .then((reportsE2E) => res.json({ reportsE2E: reportsE2E.map(reportE2E => reportE2E.toJSON()) }))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  let id = req.params.id

  const t = await e2e.findById(id)

  res.send(t)
})

module.exports = router

const mongoose = require('mongoose')
const router = require('express').Router()
const ReportsE2E = mongoose.model('ReportsE2E')

router.get('/', (req, res, next) => {
  return ReportsE2E.find()
        .sort({ createdAt: 'descending' })
        .then((reportsE2E) => res.json({ reportsE2E: reportsE2E.map(reportE2E => reportE2E.toJSON()) }))
        .catch(next)
})

module.exports = router

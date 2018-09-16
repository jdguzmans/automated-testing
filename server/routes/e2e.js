const express = require('express')
const router = express.Router()
const e2eLogic = require('../logic/e2e')

router.post('/headed', async (req, res, next) => {
  const { query: { dir, isParallel, browser } } = req
  await e2eLogic.headed(dir, isParallel === 1, browser)
  res.sendStatus(200)
})

router.post('/headless', async (req, res, next) => {
  const { query: { dir, isParallel } } = req
  await e2eLogic.headless(dir, isParallel === 1)
  res.sendStatus(200)
})

module.exports = router

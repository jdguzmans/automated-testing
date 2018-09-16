const router = require('express').Router();

router.use('/application', require('./application'));
router.use('/testingE2E', require('./testingE2E'));

module.exports = router;
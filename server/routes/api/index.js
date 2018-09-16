const router = require('express').Router();

router.use('/application', require('./application'));

module.exports = router;
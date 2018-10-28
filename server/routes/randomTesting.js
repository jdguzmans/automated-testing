const mongoose = require('mongoose');
const router = require('express').Router();
const ReportRandom = mongoose.model('ReportRandom');
const randomTesting = require('../logic/randomTesting');

// Ejecucion matriz de prueba
router.post('/matrizTest', async (req, res, next) => {
    const { body } = req;
    await randomTesting.configTest(body)
        .then(async (configTest) => {
            return res.status(200).json({
                message: {
                    name: configTest,
                },
            });
        })
        .catch((next) => {
            return res.status(422).json({
                message: {
                    name: next,
                },
            });
        });
});

router.post('/matrizTest/start', async (req, res, next) => {
    const { body } = req;
    await randomTesting.testCafeStart(body)
        .then(async (testStart) => {
            return res.status(200).json({
                message: {
                    name: testStart,
                },
            });
        })
        .catch((next) => {
            return res.status(422).json({
                message: {
                    name: next,
                },
            });
        });
});

router.get('/', (req, res, next) => {
    return ReportRandom.find()
        .sort({ createdAt: 'descending' })
        .then((randomTestings) => res.json({ randomTestings: randomTestings.map(randomTesting => randomTesting.toJSON()) }))
        .catch(next);
});

module.exports = router;
const mongoose = require('mongoose');
const router = require('express').Router();
const TestingE2E = mongoose.model('TestingE2E');
const e2e = require('../logic/e2e');

router.post('/', (req, res, next) => {
    const { body } = req;

    if(!body.name) {
        return res.status(422).json({
            errors: {
                name: 'is required',
            },
        });
    }

    if(!body.application) {
        return res.status(422).json({
            errors: {
                application: 'is required',
            },
        });
    }

    if(!body.description) {
        return res.status(422).json({
            errors: {
                description: 'is required',
            },
        });
    }

    const finalTestingE2E = new TestingE2E(body);
    return finalTestingE2E.save()
        .then(() => res.json({ applicaton: finalTestingE2E.toJSON() }))
        .catch(next);
});

router.get('/', (req, res, next) => {
    return TestingE2E.find()
        .sort({ createdAt: 'descending' })
        .then((testingsE2E) => res.json({ testingsE2E: testingsE2E.map(testingE2E => testingE2E.toJSON()) }))
        .catch(next);
});

// Ejecucion matriz de prueba
router.post('/matrizTest', async (req, res, next) => {
    const { body } = req;
    await e2e.configTest(body)
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
    //await e2e.testCafeStart(body);
});

router.post('/matrizTest/start', async (req, res, next) => {
    const { body } = req;
    await e2e.testCafeStart(body)
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

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    return TestingE2E.findById(id, (err, testingsE2E) => {
        if(err) {
            return res.sendStatus(404);
        } else if(testingsE2E) {
            req.testingsE2E = testingsE2E;
            return res.json({ testingsE2E: req.testingsE2E });
        }
    }).catch(next);
});


router.patch('/dataCode/:id', async (req, res, next) => {
    const { body } = req;
    await e2e.codeTestCafe(body,req.params.id);
    res.sendStatus(200);
});

router.get('/dataCode/:id', async (req, res, next) => {
    return e2e.getCodeTestCafe(req.params.id)
        .then((result) => res.json({ result: result }))
        .catch(next);
});

router.patch('/:id', (req, res, next) => {

    return TestingE2E.findOne({
        _id: req.params.id
    }).then((testingsE2E) => {
        const { body } = req;
        req.testingsE2E = testingsE2E;

        if(typeof body.name !== 'undefined') {
            req.testingsE2E.name = body.name;
        }

        if(typeof body.application !== 'undefined') {
            req.testingsE2E.application = body.application;
        }

        if(typeof body.description !== 'undefined') {
            req.testingsE2E.description = body.description;
        }

        return req.testingsE2E.save()
            .then(() => res.json({ testingsE2E: req.testingsE2E.toJSON() }))
            .catch(next);
    });
});

module.exports = router;
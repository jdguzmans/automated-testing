const mongoose = require('mongoose');
const router = require('express').Router();
const TestingE2E = mongoose.model('TestingE2E');

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

    if(!body.fileTest) {
        return res.status(422).json({
            errors: {
                fileTest: 'is required',
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

module.exports = router;
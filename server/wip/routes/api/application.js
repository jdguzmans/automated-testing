const mongoose = require('mongoose');
const router = require('express').Router();
const Application = mongoose.model('Application');

router.post('/', (req, res, next) => {
    const { body } = req;

    if(!body.name) {
        return res.status(422).json({
            errors: {
                name: 'is required',
            },
        });
    }

    if(!body.url) {
        return res.status(422).json({
            errors: {
                url: 'is required',
            },
        });
    }

    if(!body.type) {
        return res.status(422).json({
            errors: {
                type: 'is required',
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

    const finalApplication = new Application(body);
    return finalApplication.save()
        .then(() => res.json({ applicaton: finalApplication.toJSON() }))
        .catch(next);
});

module.exports = router;
const mongoose = require('mongoose');
const router = require('express').Router();
const { MONGODB_URI, STATIC_PATH } = require('../config')
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

router.get('/', (req, res, next) => {
    return Application.find()
        .sort({ createdAt: 'descending' })
        .then((applications) => res.json({ applications: applications.map(application => application.toJSON()) }))
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    return Application.findById(id, (err, application) => {
        if(err) {
            return res.sendStatus(404);
        } else if(application) {
            req.application = application;
            return res.json({ application: req.application });
        }
    }).catch(next);
});

router.patch('/:id', (req, res, next) => {

    return Application.findOne({
        _id: req.params.id
    }).then((application) => {
        const { body } = req;
        req.application = application;

        if(typeof body.name !== 'undefined') {
            req.application.name = body.name;
        }

        if(typeof body.url !== 'undefined') {
            req.application.url = body.url;
        }

        if(typeof body.type !== 'undefined') {
            req.application.type = body.type;
        }

        if(typeof body.description !== 'undefined') {
            req.application.description = body.description;
        }

        if(typeof body.host !== 'undefined') {
            req.application.host = body.host;
        }

        if(typeof body.nameDb !== 'undefined') {
            req.application.nameDb = body.nameDb;
        }

        if(typeof body.userDb !== 'undefined') {
            req.application.userDb = body.userDb;
        }

        if(typeof body.passwordDB !== 'undefined') {
            req.application.passwordDB = body.passwordDB;
        }

        return req.application.save()
            .then(() => res.json({ application: req.application.toJSON() }))
            .catch(next);
    });
});

module.exports = router;
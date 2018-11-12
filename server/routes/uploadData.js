const mongoose = require('mongoose')
const router = require('express').Router();
const uploadData = require('../logic/uploadData');
const UploadData = mongoose.model('UploadData')

router.post('/getTablesDb', async (req, res, next) => {
    const { body } = req

    await uploadData.getListTableDB(body)
        .then(async (listTableDb) => {
            return res.status(200).json({
                message: {
                    name: listTableDb
                }
            })
        })
        .catch((next) => {
            return res.status(422).json({
                message: {
                    name: next
                }
            })
        })
});

router.post('/getRowTable', async (req, res, next) => {
    const { body } = req

    await uploadData.getRowTable(body)
        .then(async (listRowTable) => {
            return res.status(200).json({
                message: {
                    name: listRowTable
                }
            })
        })
        .catch((next) => {
            return res.status(422).json({
                message: {
                    name: next
                }
            })
        })
});

router.post('/save', (req, res, next) => {
    const { body } = req
    let dataJson  = {};
    body.dataJson = JSON.parse(body.dataJson)

    for(var key in body.dataJson) {
        for(var name in body.dataJson[key]) {
            dataJson[name] = body.dataJson[key][name]
        }
    }

    body.dataJson = dataJson

    const finalUploadData = new UploadData(body)
    return finalUploadData.save()
        .then(() => res.json({ register: finalUploadData.toJSON() }))
        .catch(next)
})

router.get('/', (req, res, next) => {
    return UploadData.find()
        .sort({ createdAt: 'descending' })
        .then((uploadDatas) => res.json({ uploadDatas: uploadDatas.map(uploadData => uploadData.toJSON()) }))
        .catch(next)
})

router.post('/start', async (req, res, next) => {
    const { body } = req
    await uploadData.uploadStart(body)
        .then(async (testStart) => {
            return res.status(200).json({
                message: {
                    name: testStart
                }
            })
        })
        .catch((next) => {
            return res.status(422).json({
                message: {
                    name: next
                }
            })
        })
})
module.exports = router;
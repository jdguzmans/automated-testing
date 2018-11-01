const router = require('express').Router();
const uploadData = require('../logic/uploadData');

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
// Ejecucion cargue datos
/*router.post('/getTablesDb', async (req, res, next) => {
    const { body } = req;
    await uploadData.mockaroo(body);
    res.sendStatus(200);

});

router.post('/matrizTest', async (req, res, next) => {
    const { body } = req
    await e2e.configTest(body)
        .then(async (configTest) => {
            return res.status(200).json({
                message: {
                    name: configTest
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
})*/

module.exports = router;
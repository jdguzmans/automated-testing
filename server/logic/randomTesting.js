const mongoose = require('mongoose');
const ReportRandom = mongoose.model('ReportRandom');
const Application = mongoose.model('Application');
const exec = require('child_process').exec;
const fs = require('fs');

var exports = module.exports = {};

/**
 * Metodo para realizar la configuracion necesaria para la ejecucion de la prueba
 * @param data
 * @returns {Promise<any>}
 */
exports.configTest  = function (data){
    return new Promise((resolve, reject) => {
        Application.findOne({
            _id: data.idAppliRandom
        }).then((application) => {
            let infoScreen = data.pantalla.split('x');
            let infoConfig = {
                baseUrl      : application.toJSON().url,
                resizeWindow : {
                    width  : parseInt(infoScreen[0]),
                    height : parseInt(infoScreen[1])
                },
                event : data.event
            };

            try {
                fs.writeFileSync('RandomTesting/config.json', JSON.stringify(infoConfig));
                resolve(true);
            } catch(err) {
                reject('Se presento un error al configurar la prueba a ejecutar');
            }
        });
    });
}

/**
 * Metodo para ejecutar el test
 * @param data
 * @returns {Promise<any>}
 */
exports.testCafeStart = function (data) {
    return new Promise((resolve, reject) => {
        let properties = data.navegador;
        if(data.mode === 'true'){
            properties += ':headless';
        }

        const finalReportRandom = new ReportRandom(data);
        finalReportRandom.save()
            .then()
            .catch();

        const nameReport = finalReportRandom.toJSON()._id;

        exec('testcafe '+properties+' RandomTesting/test/randomTesting.js --reporter html -s screenshots -p "RandomTesting/'+nameReport+'/${FILE_INDEX}.png"', (er, stdout, stderr) => {
            if (er) {
                console.log('ERROR')
                console.log(er)
                console.log('STDERR')
                console.log(stderr)
                reject(er)
            }
            if (stdout) {
                fs.appendFile('RandomTesting/report/'+nameReport+'.html', stdout, (err) => {
                    if (err){
                        reject('Se presento un error al generar el reporte')
                    };
                    resolve('La prueba se realizo con exito');
                });
            }
        });
    });
}
const router = require('express').Router();
const mongoose = require('mongoose');
const ReportsE2E = mongoose.model('ReportsE2E');
const Application = mongoose.model('Application');
const TestingE2E = mongoose.model('TestingE2E');
const exec = require('child_process').exec;
const fs = require('fs');

var exports = module.exports = {};

/**
 * Metodo para guardar el codigo escrito para el test
 * @param data
 * @param id
 * @returns {Promise<any>}
 */
exports.codeTestCafe  = function (data,id){
    return new Promise((resolve, reject) => {
        fs.writeFile('TestingE2E/test/'+id+'.js', data.code, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        resolve()
    });
}

/**
 * Obtener el codigo fuente escrito para el test
 * @param id
 * @returns {Promise<any>}
 */
exports.getCodeTestCafe  = function (id){
    return new Promise((resolve, reject) => {
        fs.readFile('TestingE2E/test/'+id+'.js','utf8', function(err, data) {
            resolve(data);
        });
    });
}

/**
 * Metodo para realizar la configuracion necesaria para la ejecucion de la prueba
 * @param data
 * @returns {Promise<any>}
 */
exports.configTest  = function (data){
    return new Promise((resolve, reject) => {
        fs.exists('TestingE2E/test/'+data.idTest+'.js',function(exists) {
            if (exists) {
                Application.findOne({
                    _id: data.idApplication
                }).then((application) => {
                    let infoScreen = data.pantalla.split('x');
                    let infoConfig = {
                        baseUrl      : application.toJSON().url,
                        resizeWindow : {
                            width  : parseInt(infoScreen[0]),
                            height : parseInt(infoScreen[1])
                        }
                    };

                    try {
                        fs.writeFileSync('TestingE2E/config.json', JSON.stringify(infoConfig));
                        resolve(true);
                    } catch(err) {
                        reject('Se presento un error al configurar la prueba a ejecutar');
                    }
                });
            } else {
                reject('Esta prueba no ha sido escrita, por favor escriba la prueba a ejecutar');
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

        const finalReportsE2E = new ReportsE2E(data);
        finalReportsE2E.save()
            .then()
            .catch();

        const nameReport = finalReportsE2E.toJSON()._id;

        exec('testcafe '+properties+' TestingE2E/test/'+data.idTest+'.js --reporter html -s screenshots -p "TestingE2E/'+nameReport+'/${FILE_INDEX}.png"', (er, stdout, stderr) => {
            if (er) {
                console.log('ERROR')
                console.log(er)
                console.log('STDERR')
                console.log(stderr)
                reject(er)
            }
            if (stdout) {
                fs.appendFile('TestingE2E/Report/'+nameReport+'.html', stdout, (err) => {
                    if (err){
                        reject('Se presento un error al generar el reporte')
                    };
                    resolve('La prueba se realizo con exito');
                });
            }
        });
    });
}


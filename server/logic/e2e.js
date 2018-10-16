const router = require('express').Router();
const mongoose = require('mongoose');
const ReportsE2E = mongoose.model('ReportsE2E');
const exec = require('child_process').exec
const fs = require('fs');

var exports = module.exports = {};

exports.codeTestCafe  = function (data,id){
    return new Promise((resolve, reject) => {
        fs.writeFile('TestingE2E/test/'+id+'.js', data.code, (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
        resolve()
    });
}

exports.getCodeTestCafe  = function (id){
    return new Promise((resolve, reject) => {
        fs.readFile('TestingE2E/test/'+id+'.js','utf8', function(err, data) {
            resolve(data);
        });
    });
}

exports.testCafeStart = function (data) {
    return new Promise((resolve, reject) => {

        const finalReportsE2E = new ReportsE2E(data);
        finalReportsE2E.save()
            .then()
            .catch();

        let properties = data.navegador;
        if(data.mode === 'true'){
            properties += ':headless';
        }

        const nameReport = finalReportsE2E.toJSON()._id;
        exec('testcafe '+properties+' TestingE2E/'+data.pantalla+'/test1.js --reporter html', (error, stdout, stderr) => {
            if (error) {
                console.log('ERROR')
                console.log(error)
                console.log('STDERR')
                console.log(stderr)
                reject(stderr)
            }
            if (stdout) {
                console.log('OUT')
                fs.appendFile('TestingE2E/Report/'+nameReport+'.html', stdout, (err) => {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
                console.log(stdout)
                resolve()
            }
        })
    });
}

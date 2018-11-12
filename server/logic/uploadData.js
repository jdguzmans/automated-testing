var mysql = require('mysql');
const mongoose = require('mongoose')
const Mockaroo = require('mockaroo');
const Application = mongoose.model('Application')
const UploadData = mongoose.model('UploadData')
var exports = module.exports = {};


exports.uploadStart = function(data){
    return new Promise((resolve, reject) => {
        UploadData.findOne({
            _id: data.idRegister
        }).then((register) => {
            let field = [];

            for(var key in register.dataJson) {
                field.push({
                    name : key,
                    type : register.dataJson[key]
                });
            }

            let client = new Mockaroo.Client({
                apiKey: '825fa840'
            })

            client.generate({
                count: register.numRegister,
                fields: field
            }).then(function(records) {

                // CONEXION BASE DE DATOS
                Application.findOne({
                    _id: register.application
                }).then((application) => {

                    var connection = mysql.createConnection({
                        host     : application.host,
                        user     : application.userDb,
                        password : application.passwordDB,
                        database : application.nameDb,
                        port     : 3306
                    });
                    connection.connect(function(error){
                        if(error){
                            reject(error);
                        }
                    });

                    // CARGUE DE LA INFORMACION
                    for(var key in records) {
                        let fieldTable = '';
                        let bindTable  = '';
                        let dataTable  = [];
                        for(var name in records[key]) {
                            dataTable.push(records[key][name]);
                            fieldTable  += name+',';
                            bindTable   += '?,';
                        }
                        fieldTable = fieldTable.slice(0,-1);
                        bindTable  = bindTable.slice(0,-1);

                        try{
                            connection.query('INSERT INTO '+register.nameTable+' ('+fieldTable+') VALUES('+bindTable+')', dataTable, function(error, result){
                                    if(error){
                                        records[key]['state'] = false
                                        console.log(error)
                                    }else{
                                        records[key]['state'] = true
                                    }
                                }
                            );
                        } catch (e) {
                            records[key]['state'] = false
                        }

                        console.log(records)
                    }

                    //console.log(records)

                    resolve('Proceso finaliado')
                }).catch((next) => {
                    reject('Se presento un error al consultar las tablas de la DB')
                })

                /*for (var i=0; i<records.length; i++) {
                    var record = records[i];
                    console.log(record)
                    console.log('record ' + i, 'id:' + record.id + ', transactionType:' + record.transactionType);
                }*/
            });
        })
    })
}

exports.getListTableDB = function (data) {
    return new Promise((resolve, reject) => {
        Application.findOne({
            _id: data.idApplication
        }).then((application) => {
            var connection = mysql.createConnection({
                host     : application.host,
                user     : application.userDb,
                password : application.passwordDB,
                database : application.nameDb,
                port     : 3306
            });
            connection.connect(function(error){
                if(error){
                    reject(error);
                }
            });

            if(application.nameDb == ''){
                reject('Este registro no tiene datos de conexion a la DB')
            } else {
                connection.query('SHOW FULL TABLES FROM '+application.nameDb, function(error, result){
                        if(error){
                            reject(error);
                        } else {
                            let dataReturn = {
                                nameDb    : application.nameDb,
                                listTable : result
                            }

                            resolve(dataReturn)
                        }
                    }
                );
            }


        }).catch((next) => {
            reject('Se presento un error al consultar las tablas de la DB')
        })
    });
}

exports.getRowTable = function (data) {
    return new Promise((resolve, reject) => {
        Application.findOne({
            _id: data.idApplication
        }).then((application) => {
            var connection = mysql.createConnection({
                host     : application.host,
                user     : application.userDb,
                password : application.passwordDB,
                database : application.nameDb,
                port     : 3306
            });
            connection.connect(function(error){
                if(error){
                    reject(error);
                }
            });

            if(application.nameDb == ''){
                reject('Este registro no tiene datos de conexion a la DB')
            } else {
                connection.query('SHOW COLUMNS FROM '+data.nameTableDb+' FROM '+application.nameDb, function(error, result){
                        if(error){
                            reject(error);
                        } else {
                            resolve(result)
                        }
                    }
                );
            }


        }).catch((next) => {
            reject('Se presento un error al consultar las tablas de la DB')
        })
    });
}
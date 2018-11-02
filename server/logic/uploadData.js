var mysql = require('mysql');
const mongoose = require('mongoose')
const Application = mongoose.model('Application')
var exports = module.exports = {};

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
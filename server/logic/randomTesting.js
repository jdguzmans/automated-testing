const mongoose = require('mongoose')
const ReportRandom = mongoose.model('ReportRandom')

const fs = require('fs')
const fileStorage = require('../functions/fileStorage')

const MongoCLient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const { MONGODB_URI, AWS_FS_URL } = require('../config')

const queue = require('../functions/queue')

var exports = module.exports = {}

const exec = require('child_process').exec
const execSync = require('child_process').execSync;


exports.findById = async (id) => {
  return new Promise((resolve, reject) => {
    MongoCLient.connect(MONGODB_URI, async (err, client) => {
      if (err) throw err
      else {
        const Reports = client.db().collection('reportrandoms')
        const report = await Reports.findOne({ _id: ObjectId(id) })

        resolve(report)
      }
    })
  })
}

exports.getCodeTestCafe = function (id) {
  return new Promise(async (resolve, reject) => {
    let files = []

    const fileBuffers = await fileStorage.getRandomFiles(id)

    fs.writeFileSync(`./tmp/${id}-code`, fileBuffers[0])
    files[0] = fs.readFileSync(`./tmp/${id}-code`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-code`)

    fs.writeFileSync(`./tmp/${id}-code`, fileBuffers[1])
    files[1] = fs.readFileSync(`./tmp/${id}-code`, 'utf8')
    fs.unlinkSync(`./tmp/${id}-code`)

    resolve(files)
  })
}

/**
 * Metodo para ejecutar el test
 * @param data
 * @returns {Promise<any>}
 */
exports.testCafeStart = function (data) {
  return new Promise(async (resolve, reject) => {
    const finalReportRandom = new ReportRandom(data)
    await finalReportRandom.save()

    await queue.sendExecuteRandomTestMessage(finalReportRandom._id)

    resolve()
  })
}


exports.dockerStart = function (data) {
  return new Promise(async (resolve, reject) => {
    console.log(data)
    try {
      let out = execSync('docker ps -a -q').toString();
      
      if(out != ''){
        console.log('Detiene contenedores existentes')
        execSync(`docker stop $(docker ps -a -q)`)  
      } else {
        console.log('No encontro contenedores desplegados')
      }
    } catch(err) {
        console.error(err);
    }

    await sleep(2000)
    console.log('Se inicia nuevo contenedor')
    let nameContainer = 'android-container'+Math.floor(Math.random() * (1000000000 - 1) + 1)

    exec(`docker run --privileged -d --rm -p 6080:6080 -p 5554:5554 -p 5555:5555 -e DEVICE="${data.device}" --name ${nameContainer} ${data.typeAndroid}`, 
        (er, stdout, stderr) => {
          if (er) {
            console.log('ERROR')
            console.log(er)
            console.log('STDERR')
            console.log(stderr)
            reject(er)
          } else {
            console.log('contenedor iniciado')
            resolve('Contenedor iniciado')
          }
    })
  })
}

exports.installApk = function (data) {
  return new Promise(async (resolve, reject) => {
    console.log(data)
    try {
      //https://s3.amazonaws.com/pruebas-pruebas-pruebas/apk/5bf381523489802032e018e5.apk
      execSync('adb connect localhost:5555')
      console.log('Se limpia carpeta')
      execSync('rm tmp/apk/*')
      console.log('Se descargar APK')
      execSync('wget -P tmp/apk/ "'+AWS_FS_URL+'/apk/'+data.idAppliRandom+'.apk"')
      console.log('Se inicia proceso de instalacion del apk')
      execSync('adb -s "localhost:5555" install "tmp/apk/'+data.idAppliRandom+'.apk"')
      console.log('Apk instalado')
      resolve('Apk instalado')
    } catch(err) {
        console.error(err);
        reject('Se prento un error al instalar el apk')
    }
  })
}

exports.randomStartMovil = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Se ejecuta la prueba')
      console.log('Se limpia carpeta')
      execSync('rm tmp/reportApk/*')
    } catch(err) {
        console.error(err);
    }

    try {
      let out = 'Numero de eventos  :'+data.event+'\r\n'
          out += 'Dispositivo       :'+data.device+'\r\n'
          out += 'Version Android   :'+data.typeAndroid+'\r\n'
          out += '\r\n'
          out += execSync('adb -s "localhost:5555" shell monkey -p '+data.typePackage+' -v '+data.event).toString();
      fs.appendFileSync(`tmp/reportApk/${data.idAppliRandom}.csv`, out)
      console.log('Se finaliza prueba')
      resolve('Prueba finalizada')
    } catch(err) {
        console.error(err);
        reject('Se prento un error ejecutar la prueba')
    }
  })
}

exports.listPackage = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Se consultan los paquetes')
      let out = execSync('adb -s "localhost:5555" shell pm list package').toString();
      out = out.split("package:").map(n => n.trim('\r\n'));
      console.log(out)
      resolve(out)
    } catch(err) {
        console.error(err);
        reject('Se prento un error ejecutar la prueba')
    }
  })
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
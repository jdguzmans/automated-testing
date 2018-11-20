
const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const { AWS_BUCKET } = require('../config')

const E2E_FILE_PATH = 'e2e/test'
const E2E_REPORT_PATH = 'e2e/report'
const E2E_MUTATION_PATH = 'e2e/mutation'
const E2E_SCREENSHOT_PATH = 'e2e/screenshot'
const E2E_VR_PATH = 'e2e/vr'
const GAD_REPORT_PATH = 'gad'

const RANDOM_REPORT_PATH = 'random/report'
const RANDOM_SCREENSHOT_PATH = 'random/screenshot'

const VR_PATH = 'vr'
const APK_PATH = 'apk'

const saveFile = (key, buffer, contentType) => {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: AWS_BUCKET,
      Key: key,
      Body: buffer,
      ACL: 'public-read'
    }

    if (contentType) {
      params.ContentType = contentType
    }

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      } else resolve()
    })
  })
}

const getFile = (key) => {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: AWS_BUCKET,
      Key: key
    }, (err, data) => {
      if (err) console.log(err, err.stack)
      else {
        resolve(data.Body)
      }
    })
  })
}

const deleteFile = (key, type) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: AWS_BUCKET,
      Key: key
    }, (err, data) => {
      if (err) console.log(err, err.stack)
      else {
        resolve(data.Body)
      }
    })
  })
}

module.exports = {
  generateE2ETemplate: async (id) => {
    const templateBuffer = fs.readFileSync('./templates/e2e.js')
    await saveFile(`${E2E_FILE_PATH}/${id}`, templateBuffer)
  },

  getE2EFile: async (id) => {
    const file = await getFile(`${E2E_FILE_PATH}/${id}`)
    return file
  },

  saveE2EFile: async (id) => {
    const buffer = fs.readFileSync(`./tmp/${id}`)
    await deleteFile(`${E2E_FILE_PATH}/${id}`)
    await saveFile(`${E2E_FILE_PATH}/${id}`, buffer)
  },

  getMutantFile: async (id) => {
    const file = await getFile(`${E2E_MUTATION_PATH}/${id}/mutant.log`)
    return file
  },

  getMutodeFile: async (id) => {
    const file = await getFile(`${E2E_MUTATION_PATH}/${id}/mutode.log`)
    return file
  },

  saveE2EMutationMutantLog: async (id, file) => {
    const buffer = fs.readFileSync(`./tmp/.mutode/${file}`)
    await saveFile(`${E2E_MUTATION_PATH}/${id}/mutant.log`, buffer)
  },

  saveE2EMutationMutodeLog: async (id, file) => {
    const buffer = fs.readFileSync(`./tmp/.mutode/${file}`)
    await saveFile(`${E2E_MUTATION_PATH}/${id}/mutode.log`, buffer)
  },

  saveE2EScreenshot: async (id, screenshot) => {
    const buffer = fs.readFileSync(`./tmp/screenshots/${screenshot}`)
    await saveFile(`${E2E_SCREENSHOT_PATH}/${id}/${screenshot}`, buffer)
  },

  saveRandomScreenshot: async (id, screenshot) => {
    const buffer = fs.readFileSync(`./tmp/screenshots/${screenshot}`)
    await saveFile(`${RANDOM_SCREENSHOT_PATH}/${id}/${screenshot}`, buffer)
  },

  getE2EScreenshot: async (id, screenshot) => {
    const file = await getFile(`${E2E_SCREENSHOT_PATH}/${id}/${screenshot}`)
    return file
  },

  saveE2EScreenshotComparation: async (report, pic, file) => {
    await saveFile(`${E2E_VR_PATH}/${report}/${pic}`, file)
  },

  saveE2EReport: async (id) => {
    const buffer = fs.readFileSync(`./tmp/${id}.html`)
    await saveFile(`${E2E_REPORT_PATH}/${id}.html`, buffer, 'text/html')
  },

  saveRandomReport: async (id) => {
    const buffer = fs.readFileSync(`./tmp/${id}.html`)
    await saveFile(`${RANDOM_REPORT_PATH}/${id}.html`, buffer, 'text/html')
  },

  saveGADReport: async (id) => {
    const buffer = fs.readFileSync(`./tmp/${id}.csv`)
    await saveFile(`${GAD_REPORT_PATH}/${id}.csv`, buffer)
  },

  saveRegressionElectronSnapshot: async (capture, id, time) => {
    await saveFile(`${VR_PATH}/snapshots/${id}/${time}/electron.png`, capture)
  },

  getRegressionElectronSnapshot: async (id, time) => {
    const file = await getFile(`${VR_PATH}/snapshots/${id}/${time}/electron.png`)
    return file
  },

  saveRegressionPhantomSnapshot: async (capture, id, time) => {
    await saveFile(`${VR_PATH}/snapshots/${id}/${time}/phantom.png`, capture)
  },

  getRegressionPhantomSnapshot: async (id, time) => {
    const file = await getFile(`${VR_PATH}/snapshots/${id}/${time}/phantom.png`)
    return file
  },

  saveRegressionElectronPhantomDifferencesSnapshot: async (capture, id, time) => {
    await saveFile(`${VR_PATH}/snapshots/${id}/${time}/phantomElectron.jpeg`, capture)
  },

  saveRegressionElectronExecution: async (capture, id, time) => {
    await saveFile(`${VR_PATH}/executions/${id}/${time}/electron.jpeg`, capture)
  },

  saveRegressionPhantomExecution: async (capture, id, time) => {
    await saveFile(`${VR_PATH}/executions/${id}/${time}/phantom.jpeg`, capture)
  },

  saveAPK: async (id, apk) => {
    await saveFile(`${APK_PATH}/${id}.apk`, apk)
  }

}

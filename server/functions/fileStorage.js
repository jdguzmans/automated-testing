
const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const { AWS_BUCKET } = require('../config')

const E2E_FILE_PATH = 'e2e/test'
const E2E_REPORT_PATH = 'e2e/report'
const E2E_MUTATION_PATH = 'e2e/mutation'
const E2E_SCREENSHOT_PATH = 'e2e/screenshot'
const E2E_VR_PATH = 'e2e/vr'

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
    return new Promise(async (resolve, reject) => {
      const templateBuffer = fs.readFileSync('./templates/e2e.js')
      await saveFile(`${E2E_FILE_PATH}/${id}`, templateBuffer)
      resolve()
    })
  },

  getE2EFile: async (id) => {
    return new Promise(async (resolve, reject) => {
      const file = await getFile(`${E2E_FILE_PATH}/${id}`)
      resolve(file)
    })
  },

  saveE2EFile: async (id) => {
    return new Promise(async (resolve, reject) => {
      const buffer = fs.readFileSync(`./tmp/${id}`)
      await deleteFile(`${E2E_FILE_PATH}/${id}`)
      await saveFile(`${E2E_FILE_PATH}/${id}`, buffer)
      resolve()
    })
  },

  getMutantFile: async (id) => {
    return new Promise(async (resolve, reject) => {
      const file = await getFile(`${E2E_MUTATION_PATH}/${id}/mutant.log`)
      resolve(file)
    })
  },

  getMutodeFile: async (id) => {
    return new Promise(async (resolve, reject) => {
      const file = await getFile(`${E2E_MUTATION_PATH}/${id}/mutode.log`)
      resolve(file)
    })
  },

  saveE2EMutationMutantLog: async (id, file) => {
    return new Promise(async (resolve, reject) => {
      const buffer = fs.readFileSync(`./tmp/.mutode/${file}`)
      await saveFile(`${E2E_MUTATION_PATH}/${id}/mutant.log`, buffer)
      resolve()
    })
  },

  saveE2EMutationMutodeLog: async (id, file) => {
    return new Promise(async (resolve, reject) => {
      const buffer = fs.readFileSync(`./tmp/.mutode/${file}`)
      await saveFile(`${E2E_MUTATION_PATH}/${id}/mutode.log`, buffer)
      resolve()
    })
  },

  saveE2EScreenshot: async (id, screenshot) => {
    return new Promise(async (resolve, reject) => {
      const buffer = fs.readFileSync(`./tmp/screenshots/${screenshot}`)
      await saveFile(`${E2E_SCREENSHOT_PATH}/${id}/${screenshot}`, buffer)
      resolve()
    })
  },

  getE2EScreenshot: async (id, screenshot) => {
    return new Promise(async (resolve, reject) => {
      const file = await getFile(`${E2E_SCREENSHOT_PATH}/${id}/${screenshot}`)
      resolve(file)
    })
  },

  saveE2EScreenshotComparation: async (report, pic, file) => {
    return new Promise(async (resolve, reject) => {
      await saveFile(`${E2E_VR_PATH}/${report}/${pic}`, file)
      resolve()
    })
  },

  saveE2EReport: async (id) => {
    return new Promise(async (resolve, reject) => {
      const buffer = fs.readFileSync(`./tmp/${id}.html`)
      await saveFile(`${E2E_REPORT_PATH}/${id}.html`, buffer, 'text/html')
      resolve()
    })
  }

}

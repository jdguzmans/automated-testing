
const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const { AWS_BUCKET } = require('../config')

const E2E_FILE_PATH = 'e2e/test-files'

const saveFile = (name, type, buffer) => {
  return new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: AWS_BUCKET,
      Key: `${type}/${name}`,
      Body: buffer,
      ACL: 'public-read'
    }, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
      } else resolve()
    })
  })
}

const getFile = (name, type) => {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: AWS_BUCKET,
      Key: `${type}/${name}`
    }, (err, data) => {
      if (err) console.log(err, err.stack)
      else {
        resolve(data.Body)
      }
    })
  })
}

const deleteFile = (name, type) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: AWS_BUCKET,
      Key: `${type}/${name}`
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
      await saveFile(id, E2E_FILE_PATH, templateBuffer)
      resolve()
    })
  },

  getE2EFile: async (id) => {
    return new Promise(async (resolve, reject) => {
      const file = await getFile(id, E2E_FILE_PATH)
      resolve(file)
    })
  },

  saveE2EFile: async (id) => {
    return new Promise(async (resolve, reject) => {
      const buffer = fs.readFileSync(`./tmp/${id}`)
      await deleteFile(id, E2E_FILE_PATH)
      await saveFile(id, E2E_FILE_PATH, buffer)
      resolve()
    })
  }

}

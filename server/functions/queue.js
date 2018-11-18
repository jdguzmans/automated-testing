
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

const { AWS_QUEUE_URL, CREATE_E2E_TEST, EXECUTE_E2E_TEST } = require('../config')

module.exports = {
  sendCreateE2ETestMessage: (id) => {
    return new Promise((resolve, reject) => {
      const params = {
        MessageBody: CREATE_E2E_TEST,
        QueueUrl: AWS_QUEUE_URL,
        MessageAttributes: {
          '_id': {
            DataType: 'String',
            StringValue: id.toString()
          }
        }
      }

      sqs.sendMessage(params, (err, data) => {
        if (err) reject(err)
        else resolve()
      })
    })
  },

  sendExecuteE2ETestMessage: (id) => {
    return new Promise((resolve, reject) => {
      const params = {
        MessageBody: EXECUTE_E2E_TEST,
        QueueUrl: AWS_QUEUE_URL,
        MessageAttributes: {
          '_id': {
            DataType: 'String',
            StringValue: id.toString()
          }
        }
      }

      sqs.sendMessage(params, (err, data) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}

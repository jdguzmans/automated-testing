
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

const { AWS_QUEUE_URL, CREATE_E2E_TEST, EXECUTE_E2E_TEST, EXECUTE_RANDOM_TEST } = require('../config')

module.exports = {
  sendCreateE2ETestMessage: async (id) => {
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

    await sendMessage(params)
  },

  sendExecuteE2ETestMessage: async (id) => {
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

    await sendMessage(params)
  },

  sendExecuteRandomTestMessage: async (id) => {
    const params = {
      MessageBody: EXECUTE_RANDOM_TEST,
      QueueUrl: AWS_QUEUE_URL,
      MessageAttributes: {
        '_id': {
          DataType: 'String',
          StringValue: id.toString()
        }
      }
    }

    await sendMessage(params)
  }
}

const sendMessage = (params) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

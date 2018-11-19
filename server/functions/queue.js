
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

const { AWS_QUEUE_URL, CREATE_E2E_TEST, EXECUTE_E2E_TEST, EXECUTE_RANDOM_TEST, REGISTER_VR_TEST, EXECUTE_VR_TEST, UPLOAD_GAD_START } = require('../config')

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
  },

  sendCreateVRSnapshotMessage: async (id) => {
    const params = {
      MessageBody: REGISTER_VR_TEST,
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

  sendExecuteVRSnapshotMessage: async (id) => {
    const params = {
      MessageBody: EXECUTE_VR_TEST,
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

  sendUploadStartGADMessage: async (id) => {
    const params = {
      MessageBody: UPLOAD_GAD_START,
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

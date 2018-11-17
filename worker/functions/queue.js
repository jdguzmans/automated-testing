
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
const sqs = new AWS.SQS({apiVersion: '2012-11-05'})

const { AWS_QUEUE_URL } = require('../config')

module.exports = {
  sendSubmissionMessage: (email, videoPath, campaignURL) => {
    return new Promise((resolve, reject) => {
      const params = {
        MessageBody: 'Video submit',
        QueueUrl: AWS_QUEUE_URL,
        MessageAttributes: {
          'email': {
            DataType: 'String',
            StringValue: 'jdguzmans@hotmail.com'
          },
          'videoPath': {
            DataType: 'String',
            StringValue: videoPath
          },
          'campaignURL': {
            DataType: 'String',
            StringValue: campaignURL
          }
        }
      }

      sqs.sendMessage(params, (err, data) => {
        if (err) reject(err)
        else resolve()
      })
    })
  },

  receiveMessages: () => {
    return new Promise((resolve, reject) => {
      const params = {
        MaxNumberOfMessages: 1,
        MessageAttributeNames: [
          'All'
        ],
        QueueUrl: AWS_QUEUE_URL,
        VisibilityTimeout: 100,
        WaitTimeSeconds: 0
      }

      sqs.receiveMessage(params, function (err, data) {
        if (err) reject(err)
        else {
          const { Messages: messages } = data
          resolve(messages)
        }
      })
    })
  },

  deleteMessage: (receipHandle) => {
    return new Promise((resolve, reject) => {
      const deleteParams = {
        QueueUrl: AWS_QUEUE_URL,
        ReceiptHandle: receipHandle
      }

      sqs.deleteMessage(deleteParams, (err, data) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}

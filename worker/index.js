require('dotenv').config()

const cron = require('node-cron')

const email = require('./functions/email')
const { receiveMessage, deleteMessage } = require('./functions/queue')
const fs = require('fs')

const { CRON_TIME, CREATE_E2E_TEST, EXECUTE_E2E_TEST, EXECUTE_RANDOM_TEST, REGISTER_VR_TEST, EXECUTE_VR_TEST } = require('./config')

const models = fs.readdirSync('./models')
models.forEach(modelStr => {
  let modelName = modelStr.slice(0, -3)
  require('./models/' + modelName)
})

const e2eLogic = require('./logic/e2e')
const randomLogic = require('./logic/randomTesting')
const vrLogic = require('./logic/visualRegression')

cron.schedule(CRON_TIME, async () => {
  console.log('Cron started')

  const message = await receiveMessage()
  console.log(message)
  if (message) {
    const { Body: type, ReceiptHandle: receiptHandle, MessageAttributes: { _id: { StringValue: _id } } } = message
    if (type === CREATE_E2E_TEST) {
      await e2eLogic.createTest(_id)
      await email.sendE2ETestCreatedEmail()
    } else if (type === EXECUTE_E2E_TEST) {
      await e2eLogic.executeTest(_id)
      await email.sendE2ETestExecutedEmail()
    } else if (type === EXECUTE_RANDOM_TEST) {
      await randomLogic.executeTest(_id)
      await email.sendRandomTestExecutedEmail()
    } else if (type === REGISTER_VR_TEST) {
      await vrLogic.createSnapshot(_id)
      await email.sendVRCreationTestEmail()
    } else if (type === EXECUTE_VR_TEST) {
      await vrLogic.executeSnapshot(_id)
      await email.sendVRExecutionTestEmail()
    }
    await deleteMessage(receiptHandle)
  }
})

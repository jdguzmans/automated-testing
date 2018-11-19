const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const ses = new AWS.SES({ apiVersion: '2010-12-01' })

const { EMAIL_ACCOUNT } = require('../config')

const sendEmail = (message) => {
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: [
          'jd.guzman10@uniandes.edu.co'
        ]
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: message
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Pruebas'
        }
      },
      Source: EMAIL_ACCOUNT
    }
    ses.sendEmail(params, (err, data) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

module.exports = {
  sendE2ETestCreatedEmail: async () => {
    await sendEmail('Terminada de crear la prueba E2E')
  },

  sendE2ETestExecutedEmail: async () => {
    await sendEmail('Terminada de ejecutar la prueba E2E')
  },

  sendRandomTestExecutedEmail: async () => {
    await sendEmail('Terminada de ejecutar la prueba Random')
  },

  sendVRCreationTestEmail: async () => {
    await sendEmail('Terminado de crear el snapshot de VR')
  },

  sendVRExecutionTestEmail: async () => {
    await sendEmail('Terminado de ejecutar el snapshot de VR')
  }

}


const { EMAIL_ACCOUNT, WEB_CLIENT_URL } = require('../config')
const helper = require('sendgrid').mail

console.log(WEB_CLIENT_URL)

module.exports = {
  sendVideoFormattedEmail: async (to, campaignURL) => {
    return new Promise((resolve, reject) => {
      const fromEmail = new helper.Email(EMAIL_ACCOUNT)
      const toEmail = new helper.Email(to)
      const subject = 'Video uploaded'
      const content = new helper.Content('text/plain', `Hey, we just finished uploading your video! Check it in ${WEB_CLIENT_URL}/public/${campaignURL}`)
      const mail = new helper.Mail(fromEmail, subject, toEmail, content)
      const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      })

      sg.API(request, (err, response) => {
        if (err) reject(err)
        else {
          console.log(response.statusCode)
          console.log(response.body)
          console.log(response.headers)
          resolve()
        }
      })
    })
  }
}

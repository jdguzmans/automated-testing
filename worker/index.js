require('dotenv').config()

const cron = require('node-cron')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const { receiveMessages, deleteMessage } = require('./functions/queue')

const { CRON_TIME, MONGODB_URI, AWS_CLOUDFRONT_URL, AWS_BUCKET } = require('./config')

cron.schedule(CRON_TIME, async () => {
  console.log('Cron started')

  const messages = await receiveMessages()
  if (messages) {
    eachLimit(messages, 1, (message, cb) => {
      const { MessageAttributes: { email: { StringValue: authorEmail }, videoPath: { StringValue: videoPath }, _id: { StringValue: _id }, campaignURL: { StringValue: campaignURL } }, ReceiptHandle: receiptHandle } = message
      console.log(`id del submit a convertir: ${_id}`)
      const rand = Math.floor((Math.random() * 1000) + 1)

      request(`${AWS_CLOUDFRONT_URL}/vid1/${videoPath}`)
        .pipe(fs.createWriteStream(`./tmp/${rand}-${videoPath}`))
        .on('finish', async () => {
          const formattedVideoPath = await convertVideo(videoPath, rand)

          streamToBuffer(fs.createReadStream(`./tmp/${rand}-${formattedVideoPath}`), (err, buffer) => {
            if (err) throw err
            else {
              s3.putObject({
                Bucket: AWS_BUCKET,
                Key: `vid2/${formattedVideoPath}`,
                Body: buffer,
                ACL: 'public-read'
              }, (err, data) => {
                if (err) throw (err)
                else {
                  fs.unlinkSync(`./tmp/${rand}-${videoPath}`)
                  fs.unlinkSync(`./tmp/${rand}-${formattedVideoPath}`)

                  if (err) throw err
                  else {
                    MongoClient.connect(MONGODB_URI, async (err, client) => {
                      if (err) throw err
                      else {
                        const CampaignSubmit = client.db().collection('CampaignSubmit')

                        await CampaignSubmit.updateOne({ _id: ObjectId(_id) }, {
                          $set: { formattedVideoPath }
                        })
                        client.close()

                        await sendVideoFormattedEmail(authorEmail, campaignURL)
                        await deleteMessage(receiptHandle)
                        console.log('terminado')
                      }
                    })
                  }
                }
              })
            }
          })
        })
    })
  }
})

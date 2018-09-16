const webdriverio = require('webdriverio')

const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
}

const client = webdriverio.remote(options)

module.exports = async (url) => {
  return new Promise(async (resolve, reject) => {
    const title = await client
    .init()
      .url(url)
      .getTitle()
    console.log('Title was: ' + title)

    client.end()
  })
}

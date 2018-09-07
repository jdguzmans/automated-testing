module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    // const {Builder} = require('selenium-webdriver')
    // await new Builder().forBrowser('firefox').build()
    const webdriverio = require('webdriverio')
    const options = {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }

    webdriverio
          .remote(options)
          .init()
          .url(url)
          .getTitle().then(function (title) {
            console.log('Title was: ' + title)
          })
          .end()
          .catch((err) => {
            console.log(err)
          })
  })
}


const exec = require('child_process').exec
const CHROME = 'chrome'

// const CANARY = 'Canary'
// const CHROMIUM = 'Chromium'

module.exports = {
  headed: (dir, isParallel, browser) => {
    return new Promise((resolve, reject) => {
      const cBrowser = (browser === CHROME ? 'chrome' : 'firefox')
      exec('./node_modules/cypress/bin/cypress run --headed --browser ' + cBrowser + (isParallel ? ' --parallel' : '') + ' --project ' + dir, (error, stdout, stderr) => {
        if (error) {
          console.log('ERROR')
          console.log(error)
          console.log('STDERR')
          console.log(stderr)
          reject(stderr)
        }
        if (stdout) {
          console.log('OUT')
          console.log(stdout)
          resolve()
        }
      })
    })
  },
  headless: (dir, isParallel) => {
    return new Promise((resolve, reject) => {
      console.log('yava')
      exec('./node_modules/cypress/bin/cypress run --project ' + dir + (isParallel ? '--parallel ' : ''), (error, stdout, stderr) => {
        if (error) {
          console.log('ERROR')
          console.log(error)
          console.log('STDERR')
          console.log(stderr)
          reject(stderr)
        }
        if (stdout) {
          console.log('OUT')
          console.log(stdout)
          resolve()
        }
      })
    })
  }
}

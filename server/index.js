#!/usr/bin/env node

// java -jar ./selenium-server-standalone-2.53.1.jar -Dwebdriver.chrome.driver="chromedriver"

const inquirer = require('inquirer')
const exec = require('child_process').exec

const HEADED = 'Headed end to end tests'
const HEADLESS = 'Headless end to end tests'
const MONKEY = 'Monkey tests'

const CHROME = 'Chrome'
const CANARY = 'Canary'
const CHROMIUM = 'Chromium'

console.log('\nWelcome to jjss, a Cypress tool')

const home = async () => {
  console.log('\nVerifying if environment is suitable for jjss..')
  let canRun = await verify()
  if (!canRun) console.log('...it is not, sorry.\n')
  else {
    console.log('...it is!\n')

    let questions = [{
      type: 'rawlist',
      name: 'mode',
      message: 'What do you want to do?',
      choices: [HEADED, HEADLESS, MONKEY]
    }]

    const { mode } = await inquirer.prompt(questions)

    let start
    if (mode === HEADLESS || mode === HEADED) {
      questions = [{
        type: 'input',
        name: 'dir',
        message: 'What is the path of the directory the Cypress project is in?'
      }, {
        type: 'confirm',
        name: 'isParallel',
        message: 'Would you like it for the execution to be parallel?'
      }]

      const { dir, isParallel } = await inquirer.prompt(questions)
      if (mode === HEADED) {
        start = new Date()
        await headless(dir, isParallel)
      } else {
        questions = [{
          type: 'rawlist',
          name: 'browser',
          message: 'Which browser would you like to test in?',
          choices: [CHROME, CANARY, CHROMIUM]
        }]

        const { browser } = await inquirer.prompt(questions)
        start = new Date().getTime()
        await headed(dir, isParallel, browser)
      }
    } else if (mode === MONKEY) {
      questions = [{
        type: 'input',
        name: 'url',
        message: 'What is the url?'
      }]
      const { url } = await inquirer.prompt(questions)
      start = new Date()
      await monkey(url)
    }
    let time = new Date().getTime() - start
    console.log('Execution time: ' + time / 1000 + 's')
  }
}

const headed = (dir, isParallel, browser) => {
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
}

const headless = async (dir, isParallel, browser) => {
  return new Promise((resolve, reject) => {
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

const monkey = async (url) => {
  const monkey = require('./monkey.js')
  await monkey(url)
}

const verify = async () => {
  return new Promise((resolve, reject) => {
    exec('./node_modules/cypress/bin/cypress verify', (error, stdout, stderr) => {
      if (error || stderr) resolve(false)
      else resolve(true)
    })
  })
}

home()

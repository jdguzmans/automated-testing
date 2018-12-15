/* global test fixture */

import { Selector } from 'testcafe'
import config from './config'

fixture`NewSurvey`
  .beforeEach(async t => {
    await t.resizeWindow(
      config.resizeWindow.width,
      config.resizeWindow.height
    )
  })
  .page(config.baseUrl)

test('Creates new', async t => {
  const usernameTextField = Selector('#user')
  const signInButton = Selector('#loginform > div.row.login-submit.login-content > div > p > button')

  await t
    .typeText(usernameTextField, 'H')
    .click(signInButton)

  const alert = Selector('#notif-container')

  await t.expect(alert).contains('Incorrect username and/or password!')
})

test('Wrong login with wrong password', async t => {
  const passwordTextField = Selector('#password')
  const signInButton = Selector('#loginform > div.row.login-submit.login-content > div > p > button')

  await t
    .typeText(passwordTextField, 'H')
    .click(signInButton)

  const alert = Selector('#notif-container')

  await t.expect(alert).contains('Incorrect username and/or password!')
})

test('Successfull login', async t => {
  const signInButton = Selector('#loginform > div.row.login-submit.login-content > div > p > button')

  await t
    .click(signInButton)

  const location = await t.eval(() => window.location)

  await t.expect(location.pathname).contains('index.php?r=admin')
})

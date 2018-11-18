import { Selector, t } from 'testcafe'
import config from './config.json'
import StructForm from './structForm'

const structForm = new StructForm()

fixture`My Fixture`
  .beforeEach(async t => {
    await t.resizeWindow(
      config.resizeWindow.width,
      config.resizeWindow.height
    )
  })
  .page(config.baseUrl)

test('Random Testing', async t => {
  let cont = 0
  await t.takeScreenshot()
  for (let x = 0; x <= config.event; x++) {
    let numEvent = Math.floor(Math.random() * (9 - 1)) + 1
    let resultProcess = false

    switch (numEvent) {
      case 1:
        resultProcess = await structForm.inputTextFunction()
        break
      case 2:
        resultProcess = await structForm.inputCheckboxFunction()
        break
      case 3:
        resultProcess = await structForm.inputRadioFunction()
        break
      case 4:
        resultProcess = await structForm.inputNumberFunction()
        break
      case 5:
        resultProcess = await structForm.textAreaFunction()
        break
      case 6:
        resultProcess = await structForm.linksFunction()
        break
      case 7:
        resultProcess = await structForm.buttonFunction()
        break
      case 8:
        resultProcess = await structForm.submitFunction()
        break
    }

    if (cont > 10) {
      break
    }

    if (!resultProcess) {
      cont++
      x--
    } else {
      cont = 0
      await t.takeScreenshot()
    }
  }
})

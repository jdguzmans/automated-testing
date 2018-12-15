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
  await t.takeScreenshot()

  const startNumber = config.event || 20

  let numEvents = startNumber

  while (numEvents !== 0) {
    let numEvent = numEvents === startNumber ? 7 : Math.floor(Math.random() * (9 - 1)) + 1

    switch (numEvent) {
      case 1:
        await structForm.inputTextFunction()
        break
      case 2:
        await structForm.inputCheckboxFunction()
        break
      case 3:
        await structForm.inputRadioFunction()
        break
      case 4:
        await structForm.inputNumberFunction()
        break
      case 5:
        await structForm.textAreaFunction()
        break
      case 6:
        await structForm.linksFunction()
        break
      case 7:
        await structForm.buttonFunction()
        break
      case 8:
        await structForm.submitFunction()
        break
    }

    await t.takeScreenshot()
    numEvents--
  }
})

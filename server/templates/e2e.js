import { Selector } from 'testcafe'
import config from '../config'

fixture`My Fixture`
    .beforeEach(async t => {
      await t.resizeWindow(
            config.resizeWindow.width,
            config.resizeWindow.height
        )
    })
    .page(config.baseUrl)

// Espacio para digitar el caso de prueba

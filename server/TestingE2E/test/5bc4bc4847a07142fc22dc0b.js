import { Selector } from 'testcafe';
import config from '../config';

fixture `My Fixture`
    .beforeEach( async t => {
        await t.resizeWindow(
            config.resizeWindow.width,
            config.resizeWindow.height
        );
    })
    .page (config.baseUrl);

test('My test', async t => {
    const checkBoxesStartingWithR = Selector(() => {
        let labels = document.querySelectorAll('label');

        labels = Array.prototype.slice.call(labels);

        const targetLabels = labels.filter(label => label.textContent.match(/^R/));

        return targetLabels.map(label => label.children[0]);
    });
    
    await t
      .takeScreenshot()
      .click(checkBoxesStartingWithR.nth(0))
      .takeScreenshot();
});
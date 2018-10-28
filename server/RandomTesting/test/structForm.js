import { Selector, t } from 'testcafe';

export default class StructForm{
    constructor(){
        this.fieldInputText = Selector('input').withAttribute('type', 'text')
            .filter(node => $(node).is(':visible'));
        this.fieldInputCheckbox = Selector('input').withAttribute('type', 'checkbox')
            .filter(node => $(node).is(':visible'));
        this.fieldInputRadio  = Selector('input').withAttribute('type', 'radio')
            .filter(node => $(node).is(':visible'));
        this.fieldInputNumber = Selector('input').withAttribute('type', 'number')
            .filter(node => $(node).is(':visible'));
        this.fieldTextarea    = Selector('textarea').filter(node => $(node).is(':visible'));
        this.fieldSelect      = Selector('select').filter(node => $(node).is(':visible'));
        this.linksHref        = Selector('a').filter(node => $(node).is(':visible'));
        this.button           = Selector('button').filter(node => $(node).is(':visible'));
        this.fieldInputSubmit = Selector('input').withAttribute('type', 'submit')
            .filter(node => $(node).is(':visible'));
    }

    inputTextFunction = async function(){
        await t.wait(1000);

        try{
            let fieldInputTextCount = await this.fieldInputText.count;

            if(fieldInputTextCount > 0) {
                for(let x = 0; x < fieldInputTextCount; x++){
                    let maxText = await this.fieldInputText.nth(x).getAttribute('maxlength');
                    let valueText = await this.fieldInputText.nth(x).getAttribute('value');

                    if (valueText == undefined || valueText.trim() == '') {

                        let text = this.textRandom(maxText);

                        await t.typeText(
                            this.fieldInputText.nth(x),
                            text,
                            {replace: true}
                        );
                    }
                }
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    inputCheckboxFunction = async function(){
        await t.wait(1000);

        try{
            let fieldInputCheckboxCount = await this.fieldInputCheckbox.count;

            if(fieldInputCheckboxCount > 0) {
                for(let x = 0; x < fieldInputCheckboxCount; x++){
                    let nameField = await this.fieldInputCheckbox.nth(x).getAttribute('name');
                    let filterName = this.fieldInputCheckbox.filter('[name="' + nameField + '"]');
                    let checkboxCount = await filterName.count;
                    let numCheck = this.numRandom(checkboxCount);

                    if (numCheck === 0) {
                        numCheck = 1;
                    }

                    for (let y = 0; y < numCheck; y++) {
                        let stateCheck = await filterName.nth(y).checked;
                        if (!stateCheck) {
                            await t.click(filterName.nth(y));
                        }
                    }
                }

                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    inputRadioFunction = async function(){
        await t.wait(1000);

        try{
            let fieldInputRadioCount = await this.fieldInputRadio.count;

            if(fieldInputRadioCount > 0) {
                for(let x = 0; x < fieldInputRadioCount; x++){
                    let nameField = await this.fieldInputRadio.nth(x).getAttribute('name');
                    let filterName = this.fieldInputRadio.filter('[name="' + nameField + '"]');
                    let radioCount = await filterName.count;
                    let numClick = this.numRandom(radioCount);

                    await t.click(filterName.nth(numClick));
                }
                return true;
            } else {
                return false;
            }
        }catch (e) {
            return false;
        }

    }

    inputNumberFunction = async function(){
        await t.wait(1000);

        try {
            let fieldInputNumberCount = await this.fieldInputNumber.count;

            if(fieldInputNumberCount > 0){
                for(let x = 0; x < fieldInputNumberCount; x++){
                    let nameField  = await this.fieldInputNumber.nth(x).getAttribute('name');
                    let filterName = this.fieldInputNumber.filter('[name="'+nameField+'"]');
                    let radioCount = await filterName.count;
                    let numClick   = this.numRandom(radioCount);

                    await t.click(filterName.nth(numClick));
                }
                return true;
            }else {
                return false;
            }
        } catch (e) {
            return false;
        }

    }

    textAreaFunction = async function(){
        await t.wait(1000);

        try{
            let fieldTextareaCount = await this.fieldTextarea.count;

            if(fieldTextareaCount > 0) {
                for(let x = 0; x < fieldTextareaCount; x++){
                    let text = this.textRandom(15);

                    await t.typeText(
                        this.fieldTextarea.nth(x),
                        text,
                        {replace: true}
                    );
                }
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    selectFunction = async function() {
        await t.wait(1000);

        try{
            let fieldSelectCount = await this.fieldSelect.length;

            if(fieldSelectCount > 0) {
                for(let x = 0; x < fieldSelectCount; x++){
                    let optionSelect = this.fieldSelect.nth(x).find('option');
                    let selectCount = await optionSelect.count;
                    let numOption = this.numRandom(selectCount);

                    if (numOption === 0 && selectCount > 0) {
                        numOption = 1;
                    }

                    await t.click(this.fieldSelect.nth(x));
                    await t.wait(500);
                    await t.click(optionSelect.nth(numOption));
                }
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }

    }

    linksFunction = async function() {
        await t.wait(1000);

        try{
            let linksCount = await this.linksHref.count;
            if(linksCount > 0) {
                let fieldRandom = this.intRandom(0, linksCount);
                await t.click(this.linksHref.nth(fieldRandom));
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }

    }

    buttonFunction = async function() {
        await t.wait(1000);

        try{
            let buttonCount = await this.button.count;

            if(buttonCount > 0) {
                let fieldRandom = this.intRandom(0, buttonCount);
                await t.click(this.button.nth(fieldRandom));
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }

    }

    submitFunction = async function() {
        await t.wait(1000);

        try{
            let submitCount = await this.fieldInputSubmit.count;

            if(submitCount > 0) {
                let fieldRandom = this.intRandom(0, submitCount);
                await t.click(this.fieldInputSubmit.nth(fieldRandom));
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }

    }

    intRandom = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    numRandom = function(lengthNum){
        let numReturn = Math.floor(Math.random()*lengthNum);

        return numReturn;
    }

    textRandom = function(lengthText=50){
        let textReturn = '';
        let textRef    = "abcdefghijklmnñopqrstuvwxyz";
        textRef   += "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        textRef   += "0123456789";

        for(let i = 0; i < lengthText; i++){
            textReturn += textRef.charAt(
                Math.floor(Math.random()*textRef.length)
            );
        }

        return textReturn;
    }

}
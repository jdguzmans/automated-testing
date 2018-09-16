/* global describe it cy */

describe('Login', function () {
  it('Logs in', function () {
    cy.visit('https://empresario.chiper.co')

    cy.get('#email').click().type('jose.oberto@imaginamos.co')
    cy.get('#password').click().type('pokemon666')
    cy.get('#root > div > div > div.sc-iGPElx.lcJzfE > div > form > button.jss60.jss36.jss45.jss48.jss59.sc-fOICqy.gMJkkF').click()
    cy.wait(1000)
  })
})

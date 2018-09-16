/* global describe it cy */

describe('Teacher lookup', function () {
  it('Searches a teacher and goes to his page', function () {
    cy.visit('https://losestudiantes.co')
    cy.contains('Cerrar').click()

    cy.get('.navbar').get('.Select-control').find('span[class="Select-multi-value-wrapper"]').click().click()
    cy.get('.navbar').get('.Select-control').find('input[role="combobox"]').type('Juan Pablo Rodriguez', { force: true })
    cy.wait(2000)
    cy.get('.navbar').get('.Select').find('div[class="Select-menu-outer"]').click()
  })
})

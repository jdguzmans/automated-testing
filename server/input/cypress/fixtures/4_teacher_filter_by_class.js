/* global describe it cy */

describe('Teacher lookup', function () {
  it('sear', function () {
    cy.visit('https://losestudiantes.co/universidad-de-los-andes/ingenieria-civil-y-ambiental/profesores/juan-pablo-rodriguez-sanchez')

    cy.get('.columnLeft').find('form').find('input[name="id:ICYA3401"]').check()
    cy.get('.columnLeft').find('form').find('input[name="id:ICYA4138"]').check()
  })
})

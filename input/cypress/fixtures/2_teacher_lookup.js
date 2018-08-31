/* global describe it cy */

describe('Teacher lookup', function () {
  it('Does not find a teacher that does not exist and alerts user about it', function () {
    cy.visit('https://losestudiantes.co')
    cy.contains('Cerrar').click()

    cy.get('.navbar').get('.Select-control').find('span[class="Select-multi-value-wrapper"]').click().click()
    cy.get('.navbar').get('.Select-control').find('input[role="combobox"]').type('jwkhckljhli', { force: true })
    cy.wait(2000)
    cy.get('.navbar').get('.Select').find('div[class="Select-menu-outer"]')
      .contains('No se encontraron profesores ni materias')
  })

  it('Succesfully finds a teacher that does exist', function () {
    cy.visit('https://losestudiantes.co')
    cy.contains('Cerrar').click()

    cy.get('.navbar').get('.Select-control').find('span[class="Select-multi-value-wrapper"]').click().click()
    cy.get('.navbar').get('.Select-control').find('input[role="combobox"]').type('Juan Rodriguez Sa', { force: true })
    cy.wait(2000)
    cy.get('.navbar').get('.Select').find('div[class="Select-menu-outer"]')
      .contains('Juan Pablo Rodriguez Sanchez - Ingeniería Civil y Ambiental')
  })

  it('Succesfully finds teachers with the same prefix for name', function () {
    cy.visit('https://losestudiantes.co')
    cy.contains('Cerrar').click()

    cy.get('.navbar').get('.Select-control').find('span[class="Select-multi-value-wrapper"]').click().click()
    cy.get('.navbar').get('.Select-control').find('input[role="combobox"]').type('Juan Rodriguez', { force: true })
    cy.wait(2000)
    cy.get('.navbar').get('.Select').find('div[class="Select-menu-outer"]')
      .contains('Juan Carlos Monroy Rodriguez - Derecho')
    cy.get('.navbar').get('.Select').find('div[class="Select-menu-outer"]')
      .contains('Juan Sebastian Corredor Rodriguez - Matemáticas')
    cy.get('.navbar').get('.Select').find('div[class="Select-menu-outer"]')
      .contains('Juan Pablo Rodriguez Sanchez - Ingeniería Civil y Ambiental')
  })
})

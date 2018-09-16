/* global describe it cy */

describe('Register', function () {
  it('Creates an account', function () {
    cy.visit('https://chiper.co')

    cy.get('#___gatsby > div > div:nth-child(3) > div > section.sc-VigVT.frSUrj > div > div > div > div > button.sc-EHOje.izUCOp').click()
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(1)').click().type('Juan David')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(2)').click().type('Guzmán Sarmiento')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(3)').click().type('3138296274')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(5)').click().type('jdguzcccccmans@hotmail.coklkjljlm')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > button').click()
    cy.wait(1000)
    cy.contains('Gracias por registrarte')
  })

  it('Tries to create an account with an already existing account', function () {
    cy.visit('https://chiper.co')

    cy.get('#___gatsby > div > div:nth-child(3) > div > section.sc-VigVT.frSUrj > div > div > div > div > button.sc-EHOje.izUCOp').click()
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(1)').click().type('Juan David')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(2)').click().type('Guzmán Sarmiento')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(3)').click().type('3138296275')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > input:nth-child(5)').click().type('jdguzmans@hotmail.com')
    cy.get('#___gatsby > div > div:nth-child(3) > div > section > div > div > div.sc-epnACN.kLoUin > form > button').click()
    cy.wait(1000)
    cy.contains('Ya existe una cuenta creada con ese correo electrónico')
  })
})

describe('Creacion de usuarios', function() {
    it('Crear un usuario de manera exitosa', function() {
        cy.visit('https://losestudiantes.co')
        cy.contains('Cerrar').click()
        cy.contains('Ingresar').click()
        cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("testing1")
        cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("test")
        cy.get('.cajaSignUp').find('input[name="correo"]').click().type("testing1@example.com")
        cy.get('.cajaSignUp').contains('Estudio una maestria').click()
        cy.get('.cajaSignUp').find('select[name="idPrograma"]').select('Maestría en Seguridad de la Información')
        cy.get('.cajaSignUp').find('input[name="password"]').click().type("12345678")
        cy.get('.cajaSignUp').find('input[name="acepta"]').click()
        cy.get('.cajaSignUp').contains('Registrarse').click()
        cy.get('.sweet-alert').contains('Ocurrió un error activando tu cuenta')
    })
});
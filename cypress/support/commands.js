Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('Rafael')
  cy.get('#lastName').type('Damas')
  cy.get('#email').type('rafael.damas99@gmail.com')
  cy.get('#open-text-area').type('teste')
  cy.contains('button', 'Enviar').click()
})
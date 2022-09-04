/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  const THREE_SECONDS_IN_MS = 3000
  beforeEach(() => cy.visit('./src/index.html'))

  it('verifica o título da aplicação', function () {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    const longText = Cypress._.repeat('Teste, ', 20)

    cy.clock()

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Damas')
    cy.get('#email').type('rafael.damas99@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    const longText = Cypress._.repeat('Teste, ', 20)

    cy.clock()

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Damas')
    cy.get('#email').type('rafael.damas99gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
    cy.get('#phone')
      .type('teste')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    const longText = Cypress._.repeat('Teste, ', 20)

    cy.clock()

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Damas')
    cy.get('#email').type('rafael.damas99gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Rafael')
      .should('have.value', 'Rafael')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Damas')
      .should('have.value', 'Damas')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('rafael.damas99@gmail.com')
      .should('have.value', 'rafael.damas99@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11975409987')
      .should('have.value', '11975409987')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {

    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {

    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/camiseta-puma.jpg', 'cypress/fixtures/camiseta-puma2.jpg')
      .should(input => {
        expect(input[0].files[0].name).to.equal('camiseta-puma.jpg')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/camiseta-puma.jpg', 'cypress/fixtures/camiseta-puma2.jpg', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('camiseta-puma.jpg')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json', { enconding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing')
      .should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function () {
    const longText = Cypress._.repeat('Teste, ', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('faz uma requisição HTTP', function () {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function (response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })

  it('encontre o gato escondido', function () {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')

    cy.get('#title')
      .invoke('text', 'CAT TAT')

    cy.get('#subtitle')
      .invoke('text', 'Eu 💖 gatos!')
  })
})

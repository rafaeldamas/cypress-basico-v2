/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => cy.visit('./src/index.html'))

  // Exercício Digitando em campos e clicando em elementos
  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  // Exercício extra 1
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Teste, Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Damas')
    cy.get('#email').type('rafael.damas99@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  // Exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    const longText = 'Teste, Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Damas')
    cy.get('#email').type('rafael.damas99gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Exercício extra 3
  it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
    cy.get('#phone')
      .type('teste')
      .should('have.value', '')
  })

  // Exercício extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    const longText = 'Teste, Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Damas')
    cy.get('#email').type('rafael.damas99gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Exercício extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
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

  // Exercício extra 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Exercício extra 7
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

    // Exercício extra 8
    // Outra forma de identificar elementos (para, por exemplo, clicar neles após sua definição) é o uso da funcionalidade cy.contains().
    // Com o cy.contains(), além de um seletor CSS, você pode passar como segundo argumento um texto, o qual deve estar contido no elemento o qual você deseja identificar.
    // Algo como o seguinte: cy.contains('a', 'Clique aqui!').
    // Teu exercíco é alterar todos os locais onde identificamos o botão para posterior clique, onde em vez de identificarmos tal elemento com o cy.get(), iremos usar o cy.contains().

  // Exercício Selecionando opções em campos de seleção suspensa
  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  // Exercício extra 1
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  // Exercício extra 2
  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  // Exercício Marcando inputs do tipo radio
  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('have.value', 'feedback')
  })

  // Exercício extra 1
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  // Exercício Marcando inputs do tipo radio
  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // Exercício extra 1
  // Revise o teste chamado exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário, para garantir que em vez de um .click(), o comando .check() é utilizado para marcar o checkbox Telefone.
  // Por fim, execute o teste no Test Runner

  // Exercício Fazendo Upload de arquivos com cypress
  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]')
     .selectFile('cypress/fixtures/camiseta-puma.jpg', 'cypress/fixtures/camiseta-puma2.jpg')
     .should(input => {
        expect(input[0].files[0].name).to.equal('camiseta-puma.jpg')
     })
  })

  // Exercício extra 1
  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/camiseta-puma.jpg', 'cypress/fixtures/camiseta-puma2.jpg', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('camiseta-puma.jpg')
      })
  })

  // Exercício extra 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json', { enconding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('a')
      .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing')
      .should('be.visible')
  })
})

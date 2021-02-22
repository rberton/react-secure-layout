context('Connection form', () => {
  it('can login', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=surname-input-text]')
      .type('choopi')
      .find('[name=surname]')
      .should('have.value', 'choopi')
    cy.get('[data-cy=password-input-text]')
      .type('1234')
      .find('[name=password]')
      .should('have.value', '1234')
      .type('{enter}')
      .then(() => {
        cy.get('[data-cy=disconnect-form]').should('exist')
      })
  })

  it('can signup', () => {
    cy.visit('http://localhost:3000/signup')
    cy.get('[data-cy=firstname-input-text]')
      .type('choopa')
      .find('[name=firstname]')
      .should('have.value', 'choopa')
    cy.get('[data-cy=lastname-input-text]')
      .type('choops')
      .find('[name=lastname]')
      .should('have.value', 'choops')
    cy.get('[data-cy=surname-input-text]')
      .type('choopi')
      .find('[name=surname]')
      .should('have.value', 'choopi')
    cy.get('[data-cy=email-input-text]')
      .type('choopi@choo.ch')
      .find('[name=email]')
      .should('have.value', 'choopi@choo.ch')
    cy.get('[data-cy=password-input-text]')
      .type('1234')
      .find('[name=password]')
      .should('have.value', '1234')
    cy.get('[data-cy=confirm-input-text]')
      .type('1234')
      .find('[name=confirm]')
      .should('have.value', '1234')
      .type('{enter}')
      .then(() => {
        cy.get('[data-cy=disconnect-form]').should('exist')
      })
  })
})
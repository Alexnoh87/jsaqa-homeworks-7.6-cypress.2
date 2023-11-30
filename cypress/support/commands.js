Cypress.Commands.add('login', (email, password) => {
    cy.visit("http://qamid.tmweb.ru/admin/");
    if (email) {
        cy.get("[name='email']").type(email)
    }
    if(password) {
        cy.get("[name='password']").type(password)
    }
    cy.contains('Авторизоваться').click()
})
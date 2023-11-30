const {validEmail, validPassword, invalidEmail, invalidPassword, email, password} = require("../fixtures/login.json")
const {days, day} = require("../fixtures/page_nav.json")
import seats from '../fixtures/seats.json'

describe('tests booking tickets', () => {

  beforeEach (() => {
    cy.visit('/')
  })

  it('test page display', () => {
    cy.contains('Идём').should('be.visible')
    cy.get(days).should("have.length", 7)
  })
})

describe("tests to check admin login", () => {
  
  it("happy path test to check admin login", () => {
    cy.login(validEmail, validPassword)
    cy.contains('Управление залами').should('be.visible')
  })

  it("sad path test to check admin login", () => {
    cy.login(invalidEmail, invalidPassword)
    cy.contains('Ошибка авторизации').should('be.visible')
  })

  it("sad path test to check admin empty email", () => {
    cy.login(null, validPassword)
    cy.get(email).then ((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.")
    })
  })

  it("sad path test to check admin empty password", () => {
    cy.login(validEmail, null)
    cy.get(password).then ((elements) => {
    expect(elements[0].checkValidity()).to.be.false
    expect(elements[0].validationMessage).to.be.eql("Заполните это поле.")
    })
  })

  it("test movie booking test added from the admin panel", () => {
    cy.login(validEmail, validPassword)
    cy.get('#start-sales > [style="display: block;"] > .conf-step__selectors-box > :nth-child(1) > .conf-step__radio').click()
    cy.contains('Открыть продажу билетов').click()
    cy.contains('Продажа билетов открыта!!!').should('be.visible')
  })
})

describe('tests booking open session tickets from the admin', () => {

  beforeEach (() => {
    cy.visit('/')
  })
    
  it("test book tickets", () => {
    cy.get(day).click()
    cy.get(".movie").first().contains("12:00").click()
    seats.forEach((seat) => {
      cy.get(`.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`).click()
    })
  })
})

    





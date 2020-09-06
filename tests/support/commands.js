// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getCrossword', { prevSubject: 'element' }, (subject, options) => {
  cy.get('input').then((inputs) => {
    return Array.from(inputs.map((idx, el) => el.value)).join('')
  })
})
Cypress.Commands.add("fillCrossword", { prevSubject: 'element' }, (subject, options) => {
  if (options.crossword) {
    cy.get('input').then((inputs) => {
      const letters = options.partially ? options.crossword.grid.slice(0, 15) : options.crossword.grid
      letters.forEach((letter, idx) => {
        if (letter !== '.') {
          cy.wrap(inputs[idx]).type(letter)
        }
      })
    }).get(subject)
  }
})

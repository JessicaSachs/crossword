import { mount } from 'cypress-vue-unit-test'
import App from '../../src/App'
import { crossword } from '../fixtures/crosswords'

describe('App', () => {
  beforeEach(() => {
    cy.viewport(1600, 1000)
    mount(App)
    cy.get('[data-testid=crossword]').as('crossword')
    cy.get('[data-testid=crossword-title]').as('title')
    cy.get('[data-testid=prev').as('prev')
    cy.get('[data-testid=next').as('next')
    cy.get('[data-testid=reset').as('reset')
  })

  it.only('renders the crossword puzzle on load', function() {
    expect(cy.get('@crossword')).to.exist
  })

  it('lets you navigate to previous days', () => {
    cy.get('@title')
      .then((titleEl) => {
        const oldTitle = titleEl.text()

        cy.get('@prev').click()
        cy.get('@title').should('not.have.text', oldTitle)
        cy.get('@next').click()
        cy.get('@title').should('have.text', oldTitle)
      })
  })

  it('rerenders the crossword when you go to another day', () => {
    cy.get('@crossword')
      .fillCrossword({ crossword, instant: true })
      .get('@prev').click()
      .getCrossword().should('be.empty')
      .get('@next').click()
      .getCrossword().should('be.empty')
  })

  it('resets the crossword correctly after you fill it in', () => {
    cy.get('@crossword')
      .fillCrossword({ crossword, partially: true })
      .get('@title')
      .then((titleEl) => {
        let oldCrossword
        const oldTitle = titleEl.text()

        cy.get('@crossword').getCrossword().then(text => { oldCrossword = text })
          .get('@reset').click()
          .get('@crossword').should('not.have.text', oldCrossword)
          .get('@title').should('have.text', oldTitle)
      })
  })
})

/// <reference types="cypress" />
import Gameboard from '@/components/Gameboard'
import { mount } from 'cypress-vue-unit-test'
import { helloWorld as crossword } from '../fixtures/crosswords'

describe('Gameboard', () => {
  it('requires a crossword', () => {
    expect(() => mount(Gameboard)).to.throw
  })

  describe('successfully renders', () => {
    beforeEach(() => {
      mount(Gameboard, {
        propsData: {
          crossword
        }
      })

      cy.get('[data-testid=gameboard] [data-testid=cell]').as('cells')
      cy.get('[data-testid=gameboard] [data-testid=row]').as('rows')
    })

    it('has a crossword puzzle', () => {
      const wrapper = Cypress.vueWrapper
      expect(wrapper.props('crossword')).to.exist
      expect(wrapper.props('crossword')).to.be.a('object')
    })

    it('renders the crossword puzzle successfully', () => {
      cy.get('@cells').should('have.length', crossword.grid.length)
    })

    it('numbers the crossword puzzle correctly', () => {
      cy.get('@cells').then((cells) => {
        Array.from(cells).forEach((c, idx) => {
          expect(c).to.contain.text(crossword.grid[idx])

          if (crossword.gridnums[idx] > 0) {
            expect(c).to.contain.text(crossword.gridnums[idx])
          } else {
            expect(c).not.to.contain.text(0)
          }
        })
      })
    })

    it('renders the correct number of rows and columns', () => {
      cy.get('@rows').should('have.length', crossword.size.rows)
    })
  })
})

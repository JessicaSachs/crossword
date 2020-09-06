/// <reference types="cypress" />
import Gameboard from '@/components/Gameboard'
import { mount } from 'cypress-vue-unit-test'
import {
  helloWorld as crossword,
  crossword as bigCrossword } from '../fixtures/crosswords'

describe('Gameboard', () => {
  it('requires a crossword', () => {
    expect(() => mount(Gameboard)).to.throw
  })

  describe('larger board', () => {
    it('renders successfully', () => {
      mount(Gameboard, {
        propsData: { crossword: bigCrossword }
      }).then(() => {
        expect(Cypress.vueWrapper).to.exist
      })
    })
  })

  describe('successfully renders', () => {
    beforeEach(() => {
      mount(Gameboard, {
        propsData: {
          crossword
        }
      })

      cy.get('[data-testid=gameboard]').as('board')
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

    it('doesnt contain any placeholder dots', () => {
      cy.get('@board').should('not.contain.text', '.')
    })

    it('numbers the crossword puzzle correctly', () => {
      cy.get('@cells').then((cells) => {
        Array.from(cells).forEach((c, idx) => {
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

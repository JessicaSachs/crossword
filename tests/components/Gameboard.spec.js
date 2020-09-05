/// <reference types="cypress" />
import Gameboard from '@/components/Gameboard'
import { mount } from 'cypress-vue-unit-test'
import { crossword } from '../fixtures/crosswords'

describe('Gameboard', () => {
  it('renders successfully', () => {
    mount(Gameboard)
    cy.get('[data-testid=gameboard]').should('exist')
  })

  it('has a crossword puzzle', () => {
    mount(Gameboard, {
      propsData: {
        crossword
      }
    }).then(() => {
        const wrapper = Cypress.vueWrapper
        expect(wrapper.props('crossword')).to.exist
        expect(wrapper.props('crossword')).to.be.a('object')
      })
  })

  it('renders the crossword puzzle successfully', () => {
    cy.log('the crossword', crossword)
    mount(Gameboard, {
      propsData: {
        crossword
      }
    })

    cy.get('[data-testid=gameboard] [data-testid=cells')
      .should('have.length', crossword.gridnums.filter(g => g > 0).length)
  })
})

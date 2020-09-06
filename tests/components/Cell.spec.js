import Cell from '@/components/Cell'
import { mount } from 'cypress-vue-unit-test'

describe('Cell', () => {
  it('renders successfully with a letter and number', () => {
    const cellConfig = { letter: 'A', number: 1 }
    mount(Cell, { propsData: cellConfig })

    cy.get('[data-testid=cell]')
      .should('contain.text', cellConfig.letter)
      .and('contain.text', cellConfig.number)
  })

  it('renders a blocked out cell when theres no letter', () => {
    const cellConfig = { letter: '', number: 0 }
    mount(Cell, { propsData: cellConfig })

    cy.get('[data-testid=cell]').then((cell) => {
      expect(cell.text().trim()).to.equal('')
      expect(cell).to.have.class('blocked-out')
    })
  })
})

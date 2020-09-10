import CrosswordSkeleton from '@/components/CrosswordSkeleton'
import { mount } from 'cypress-vue-unit-test'

describe('CrosswordSkeleton', () => {
  it('works~!', () => {
    mount(CrosswordSkeleton)
    cy.get('[data-testid=crossword-skeleton]').should('exist')

    cy.get('[data-testid=crossword-skeleton]').then((el) => {
      expect(el).to.exist
    })
  })
})

import CrosswordSkeleton from '@/components/CrosswordSkeleton'
import { mount } from 'cypress-vue-unit-test'

describe('CrosswordSkeleton', () => {
  it('renders successfully', () => {
    mount(CrosswordSkeleton)
    cy.get('[data-testid=crossword-skeleton]').then((el) => expect(el).to.exist)
  })
})

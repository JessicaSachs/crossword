<template>
  <div class="crossword" data-testid="crossword">
    <div v-for="(letters, i) in lettersByRows" :key="`r-${i}`" data-testid="row" class="row">
      <Cell v-for="(letter, j) in letters"
            :show-letter="solved"
            :key="`r-${i}-c-${j}`"
            :ref="`r-${i}-c-${j}`"
            :blocked-out="letter === '.'"
            :letter="letter"
            :number="numberForCell(i, j)"
      />
    </div>
  </div>
</template>

<script>
  import Cell from './Cell'
  import { chunk } from 'lodash'
  export default {
    components: { Cell },
    props: {
      solved: { type: Boolean, default: false },
      crossword: { type: Object, required: true }
    },
    methods: {
      focus(clueNumber) {
        const rowIdx = this.numbersByRows.findIndex(row => row.indexOf(clueNumber) !== -1)
        const cellIdx = this.numbersByRows[rowIdx].indexOf(clueNumber)
        this.$refs[`r-${rowIdx}-c-${cellIdx}`][0].focus()
      }
    },
    computed: {
      numberForCell() {
        return (rowIdx, cellIdx) => {
          if (this.numbersByRows[rowIdx][cellIdx] > 0) {
            return this.numbersByRows[rowIdx][cellIdx]
          }

          return ''
        }
      },
      lettersByRows() {
        return chunk(this.crossword.grid, this.crossword.size.cols)
      },
      numbersByRows() {
        return chunk(this.crossword.gridnums, this.crossword.size.cols)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .crossword {
    margin: 0 auto;
    display: grid;
    position: relative;
    width: fit-content;

    border: 1px solid black;
    overflow: hidden;
  }

  .row {
    display: flex;
    position: relative;
    width: fit-content;
  }
</style>

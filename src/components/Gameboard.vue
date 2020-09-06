<template>
  <div class="gameboard" data-testid="gameboard">
    <div v-for="(letters, i) in lettersByRows" :key="`r-${i}`" data-testid="row" class="row">
      <Cell v-for="(letter, j) in letters"
            :key="`r-${i}-c-${j}`"
            :letter="letter === '.' ? '' : letter"
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
      crossword: { type: Object, required: true }
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
  .gameboard {
    display: grid;
    position: relative;

    border: 1px solid black;
    overflow: scroll;
  }

  .row {
    display: flex;
    position: relative;
    width: 100%;
  }
</style>

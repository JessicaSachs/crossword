<template>
  <table class="gameboard" data-testid="gameboard">
    <tr v-for="(letters, i) in lettersByRows" :key="'r-' + i" data-testid="row">
      <td>
        <Cell v-for="(letter, j) in letters"
          :key="`r-${i}-c-${j}`"
          :letter="letter" :number="numberForCell(i, j)"
        />
      </td>
    </tr>
  </table>
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
  .cell {
    text-align: center;
  }
</style>

<template>
  <div class="crossword" data-testid="crossword-skeleton">
    <div class="crossword-row" v-for="(row, i) in crossword.rows">
      <div class="cell" v-for="(cell, j) in row"
           :classes="cell.blockedOut ? 'blockedOut' : ''"
           :key="`cell-${i}-${j}`">
        <span class="cell-inner"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import crosswords from '@/../tests/fixtures/crosswords'
  export default {
    computed: {
      crossword() { return crosswords.fifteenByFifteen }
    }
  }
</script>

<style lang="scss" src="./crossword.scss"></style>

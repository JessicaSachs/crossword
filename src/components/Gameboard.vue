<template>
  <div class="gameboard" data-testid="gameboard">
    {{ crossword }}
  </div>
</template>

<script>
  export default {
    props: ['crossword'],
    computed: {
      rows() {
        return this.crossword.grid.chunk
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

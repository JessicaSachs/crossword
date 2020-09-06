<template>
  <span class="cell" data-testid="cell">
    {{ letter }}
    <span class="number" data-testid="cell-number">
      {{ number }}
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      letter: { type: String, default: '' },
      number: { type: [String, Number], optional: true , default: ''},
    }
  }
</script>

<style lang="scss" scoped>
  .cell {
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1rem;

    .number {
      position: absolute;
      color: #666;
      top: 0;
      left: 2ch;
      font-size: .75em;
    }
  }
</style>

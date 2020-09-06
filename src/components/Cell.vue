<template>
  <span class="cell" data-testid="cell" :class="classes">
    {{ letter }}
    <span class="number" data-testid="cell-number">
      {{ number !== 0 ? number : '' }}
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      letter: { type: String, default: '' },
      number: { type: [String, Number], optional: true , default: ''},
    },
    computed: {
      classes() {
        return !this.letter ? 'blocked-out' : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cell {
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 2.4rem;
    min-height: 2.4rem;

    width: 100%;

    padding: 0.25rem;

    font-size: 1rem;

    border: 1px solid black;

    vertical-align: top;

    &.blocked-out {
      background: black;
    }

    .number {
      position: absolute;

      display: inline-block;
      margin-bottom: 1.75rem;
      margin-left: 1.75rem;
      font-size: .75rem;

      color: #666;
    }
  }
</style>

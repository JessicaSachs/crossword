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

    width: 3rem;
    height: 3rem;
    padding: 0.25rem;

    font-size: 1rem;

    border: 1px solid black;

    &.blocked-out {
      background: black;
    }

    .number {
      position: absolute;

      display: inline-block;
      margin-bottom: 1rem;
      margin-left: 1.25rem;
      font-size: .75em;

      color: #666;
    }
  }
</style>

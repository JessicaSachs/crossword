<template>
  <span :data-number="number" class="cell" data-testid="cell">
    {{ letter }}
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
    :after {
      content: attr(data-number)
    }
  }
</style>

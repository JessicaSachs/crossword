<template>
  <span class="cell" data-testid="cell" :class="classes">
    <input type="text"
           data-testid="cell-input"
           :value="showLetter ? letter : value"
           :disabled="showLetter || blockedOut"
           autocomplete="false"
           ref="input"
           @beforeinput.prevent="filterManyLetters"
           @input="filterManyLetters"
    >
    <span/>
    <span class="number" data-testid="cell-number">
      {{ number !== 0 ? number : '' }}
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      showLetter: { type: Boolean, default: false },
      editable: { type: Boolean, default: true },
      blockedOut: { type: Boolean, default: false },
      letter: { type: String, default: '' },
      number: { type: [String, Number], optional: true , default: ''},
    },
    data: () => ({
      value: ''
    }),
    methods: {
      filterManyLetters(e) {
        if (e.data == null) {
          this.value = '';
          return;
        }
        this.value = e.data[0]
      },
      focus() {
        this.$refs.input.focus()
      }
    },
    computed: {
      classes() {
        return this.blockedOut ? 'blocked-out' : ''
      }
    },
    watch: {
      value(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>

  $cellSize: calc(2rem * var(--scale, 1));

  input {
    text-transform: uppercase;
    width: $cellSize;
    height: $cellSize;
    display: block;
    text-align: center;
    font-size: unset;
    font-family: unset;
    border: none;
    outline: none;
    box-shadow: none
  }

  .cell.blocked-out input {
    color: transparent;
    background: black;
  }

  .cell input:focus-within + span {
    color: deeppink;
    @media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm) {
      &:before {
        width: fill-available !important;
        height: fill-available !important;
      }
    }

    &:before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;

      z-index: 1;


      width: calc(#{$cellSize} + 0.12rem);
      height: calc(#{$cellSize} + 0.12rem);

      box-shadow: 0 0 0 3px deeppink inset;

    }
  }

  .cell {
    /*box-shadow: 0 0 0 1px black;*/
    border: 1px solid black;

    text-transform: uppercase;
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: $cellSize;
    min-height: $cellSize;

    width: 100%;

    font-size: 0.8rem;

    vertical-align: top;

    &.blocked-out {
      background: black;
      color: transparent;
      pointer-events: none;
    }

    .number {
      position: absolute;
      pointer-events: none;

      display: inline-block;

      font-size: .6rem;

      top: .2rem;
      right: .2rem;

      color: #666;
    }
  }
</style>

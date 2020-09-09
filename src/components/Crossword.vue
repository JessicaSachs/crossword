<template>
  <div v-show="showCrossword" class="crossword-container">
    <template v-if="crossword">
      <header>
      <router-link :to="yesterday"><BaseButton data-testid="prev">👈👈 Prev</BaseButton></router-link>
      <h3 v-html="title"></h3>
      <router-link :to="tomorrow"><BaseButton data-testid="next">Next 👉👉</BaseButton></router-link>
      </header>

      <CrosswordBoard
        ref="board"
        :key="crossword.id"
        :crossword="crossword"
        :solved="solved"
        :initial-board="board"
        @update-board="setBoardState"
      />

      <p>By {{ crossword.author }}, {{ crossword.date }}</p>
    </template>
  </div>
</template>

<script>
  import CrosswordBoard from '@/components/CrosswordBoard'
  import Clues from '@/components/Clues'
  import BaseButton from '@/components/BaseButton'
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    components: { CrosswordBoard, Clues, BaseButton },
    computed: {
      title() {
        const date = new Date(this.crossword.date)

        const dateTimeFormat = new Intl.DateTimeFormat('en', {
          year: 'numeric', month: 'short', day: 'numeric', weekday: 'short'
        })

        return this.crossword.isSunday ?
          `${this.crossword.title}, ${dateTimeFormat.format(date)}` :
          this.crossword.title
      },
      ...mapState(['crossword', 'showCrossword', 'solved', 'board']),
      ...mapGetters(['yesterday', 'tomorrow'])
    },
    methods: {
      solve(clue) {
        this.$refs.board.toggleShowClueNumber(clue)
      },
      focus(clue) {
        this.$refs.board.focus(clue)
      },
      ...mapActions(['setBoardState'])
    },
  }
</script>

<style scoped>
  p {
    text-align: center;
  }

  h2 {
    text-transform: uppercase;
  }

  header {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .crossword-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    grid-gap: 3rem;
  }
</style>

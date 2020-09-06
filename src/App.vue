<template>
  <div id="app">
    <h1>Component Testing with Crosswords</h1>
    <template v-if="crossword">
      <h2 data-testid="crossword-title" v-html="crossword.title"></h2>
      <nav>
        <p>Try a new Puzzle</p>

        <button data-testid="prev" @click="getPreviousDay">Previous Day</button>
        <button data-testid="next" @click="getNextDay">Next Day</button>

        <p>Puzzle Controls</p>

        <form @reset="reset" @submit.prevent>
          <button data-testid="reset" type="reset">Clear Crossword</button>
          <button @click="solved = !solved" data-testid="auto-solve">Magic Solve Button</button>
        </form>

        <p>Size Controls</p>
        <button @click="showCrossword = !showCrossword">Show/Hide</button>
        <button @click="toggleCrosswordSize(1)">1.0x</button>
        <button @click="toggleCrosswordSize(0.8)">0.8x</button>
        <button @click="toggleCrosswordSize(0.5)">0.5x</button>
      </nav>
      <main>
        <div v-if="!crossword">Loading</div>
        <Crossword class="crossword" :crossword="crossword" :solved="solved" :key="crosswordKey" v-show="showCrossword" ref="crossword"/>
        <ul>
          <li v-for="clue in clues">
            <h3 v-if="clue === 'Across' || clue === 'Down'">{{ clue }}</h3>
            <span v-else @click="jumpToCell(clue)">{{ clue }}</span>
          </li>
        </ul>
      </main>

    </template>
  </div>
</template>

<script>
  import Crossword from '@/components/Crossword'

  /** Date Utils **/
const oneDay = 1000 * 60 * 60 * 24
const formatDate = d => d.toISOString().slice(0, 10)
const addTime = (d, amount) => new Date(new Date(d).getTime() + amount)

export default {
  name: 'App',
  data() {
    const date = formatDate(new Date('01/01/2012'))
    return {
      crossword: null,
      crosswordKey: date,
      date,
      solved: false,
      showCrossword: true
    }
  },
  computed: {
    clues() {
      return ['Across', ...this.crossword.clues.across, 'Down', ...this.crossword.clues.down]
    }
  },
  methods: {
    jumpToCell(clue) {
      const clueNumber = parseInt(clue.match(/(\d+)\w?/)[0], 10)
      this.$refs.crossword.focus(clueNumber)
      this.$refs.crossword.$el.scrollIntoView()
    },
    toggleCrosswordSize(size) {
      // const getProp = () => document.documentElement.style.getPropertyValue('--scale')
      const setProp = (val) => document.documentElement.style.setProperty('--scale', val)
      setProp(size)
    },
    reset() {
      this.crosswordKey = Date.now()
    },
    getPreviousDay() {
      this.date = formatDate(addTime(this.date, -1 * oneDay))
      this.fetchCrossword()
    },
    getNextDay() {
      this.date = formatDate(addTime(this.date, oneDay))
      this.fetchCrossword()
    },
    fetchCrossword(date = this.date) {
      return fetch(`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/${date.replace(/-+/g, '/')}.json`)
        .then(response => response.json())
        .then(payload => this.crossword = payload)
        .catch(err => console.error(err))
    }
  },
  watch: {
    date(newDate) {
      this.solved = false;
      this.crosswordKey = newDate;
    }
  },
  async created() {
    this.fetchCrossword()
  },
  components: {
    Crossword,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  ul {
    display: flex;
    list-style-type: none;
    text-align: left;
    flex-wrap: wrap;
    flex-direction: column;
    grid-column-gap: 1rem;
    height: 740px;
    overflow: scroll;
    border-right: 20px solid white;

    li {
      font-size: 0.8rem;
      width: 18ch;
    }
  }

  main {
    margin: 4.17rem auto;
    width: 1200px;
  }

  @media only screen and (max-width: 600px) {
    .crossword.crossword {
      float: unset;
      position: sticky;
      top: 0;
      margin: 0;
      overflow: auto;
    }

    ul {
      height: 120vh;
      max-width: 120vw;
      margin: 0;
      padding: 1rem 0;
    }

    :root {
      --scale: 0.5;
    }
  }

  .crossword {
    float: right;
  }
</style>

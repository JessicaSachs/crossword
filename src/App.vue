<template>
  <div id="app">
    <h1>Component Testing with Crosswords</h1>
    <form @submit.prevent="reset() && fetchCrossword()" @reset="reset">
      <button type="submit">New Crossword</button>
      <button data-testid="reset" type="reset">Clear Crossword</button>
    </form>
    <div v-if="!crossword">Loading</div>
    <template v-else>
      <h2 data-testid="crossword-title" v-html="crossword.title"></h2>
      <button data-testid="prev" @click="getPreviousDay">Previous Day</button>
      <button data-testid="next" @click="getNextDay">Next Day</button>
      <Crossword :crossword="crossword" :key="crosswordKey" />
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
    }
  },
  methods: {
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
      return fetch(`https://raw.githubusercontent.com/doshea/nyt_crosswords/master/${date.replaceAll('-', '/')}.json`)
        .then(response => response.json())
        .then(payload => this.crossword = payload)
        .catch(err => console.error(err))
    }
  },
  watch: {
    date(newDate) {
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
</style>

<template>
  <div id="app">
    <Nav>
      <h3>Component Testing with Crosswords</h3>
    </Nav>

    <main>
      <router-view class="router-view"/>
    </main>
  </div>
</template>

<script>
  import Nav from '@/components/Nav'

  export default {
    components: { Nav },
    data: () => ({
      // solved: false,
      // showCrossword: true
    }),
  }
</script>
<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  margin: 0 auto;
  overflow: unset;
}

.router-view {
  margin: 0 auto;
}

@media (max-width: 1500px) {
  /*h1 {*/
  /*  font-size: 1.6rem;*/
  /*}*/

  /*h3 {*/
  /*  margin-block-end: 0.6rem;*/
  /*  margin-block-start: 0.6rem;*/
  /*}*/
}

/*@media (max-width: 1200px) {*/
/*  nav:nth-child(3),*/
/*  nav:last-child {*/
/*    grid-column: 1;*/
/*    height: unset;*/
/*    overflow: scroll;*/
/*    resize: horizontal;*/
/*    min-width: 20ch;*/
/*  }*/

/*  nav:last-child {*/
/*    grid-row: 3;*/
/*    height: unset;*/
/*  }*/

/*  main {*/
/*    position: sticky;*/
/*    top: 0;*/
/*    grid-column: 2;*/
/*    grid-row: 2;*/
/*    grid-row-end: 4;*/
/*    background: white;*/
/*    z-index: 1;*/
/*    width: 100%;*/
/*    padding-bottom: 20px;*/
/*    border-bottom: 1px solid #dadada;*/
/*  }*/
/*}*/


</style>

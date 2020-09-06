module.exports = {
  outputDir: './dist/crossword',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Crossword Game'
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/crossword/'
    : '/'
}

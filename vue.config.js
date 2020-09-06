module.exports = {
  outputDir: './dist/crossword',
  title: 'Crossword 👾',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/crossword/'
    : '/'
}

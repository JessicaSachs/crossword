module.exports = {
  outputDir: './dist/crossword',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/crossword/'
    : '/'
}

module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-reporter')({ clearReportedMessages: true }),
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-mixins'),
    require('postcss-nested')
  ]
}

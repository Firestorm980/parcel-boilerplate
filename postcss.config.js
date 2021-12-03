module.exports = {
  plugins: {
    stylelint: {},
    'postcss-reporter': { clearReportedMessages: true },
    'postcss-import': {},
    autoprefixer: {},
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-prefix-selector': {
      prefix: 'body [data-moray]',
      transform: (prefix, selector, prefixedSelector) => {
        if (selector === 'body') {
          return prefix
        }

        if (selector.includes('html:not([dir="rtl"])')) {
          const replaced = selector.replace('html:not([dir="rtl"])', '')
          return `html:not([dir="rtl"]) ${prefix} ${replaced}`
        }

        if (selector.includes('html[dir="rtl"]')) {
          const replaced = selector.replace('html[dir="rtl"]', '')
          return `html[dir="rtl"] ${prefix} ${replaced}`
        }

        return prefixedSelector
      }
    }
  }
}

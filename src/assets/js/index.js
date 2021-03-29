import Swup from 'swup'
import SwupA11yPlugin from '@swup/a11y-plugin'
import SwupPreloadPlugin from '@swup/preload-plugin'
import SwupProgressPlugin from '@swup/progress-plugin'
import SwupScrollPlugin from '@swup/scroll-plugin'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

// eslint-disable-next-line no-unused-vars
const swup = new Swup({
  animateHistoryBrowsing: true,
  containers: ['#main', '#overlay'],
  plugins: [
    new SwupA11yPlugin(),
    new SwupPreloadPlugin(),
    new SwupProgressPlugin(),
    new SwupScrollPlugin()
  ]
}) // only this line when included with script tag

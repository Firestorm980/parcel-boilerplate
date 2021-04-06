import Swup from 'swup'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

// eslint-disable-next-line no-unused-vars
const swup = new Swup({
  containers: ['#main']
}) // only this line when included with script tag

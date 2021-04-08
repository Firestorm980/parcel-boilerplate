/* eslint-disable no-unused-vars */
import Swup from 'swup'
import JsPlugin from '@swup/js-plugin'
import DebugPlugin from '@swup/debug-plugin'
import gsap from 'gsap'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

const main = document.getElementById('main')

const swup = new Swup({
  containers: ['#main'],
  plugins: [
    new JsPlugin([
      {
        from: '(.*)',
        to: '(.*)',
        in: (next) => {
          main.style.opacity = 0
          gsap.to(main, {
            opacity: 1,
            duration: 5,
            onComplete: next
          })
        },
        out: (next) => {
          main.style.opacity = 1
          gsap.to(main, {
            opacity: 0,
            duration: 5,
            onComplete: next
          })
        }
      }
    ]),
    new DebugPlugin()
  ]
})

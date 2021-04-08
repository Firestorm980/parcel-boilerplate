/* eslint-disable no-unused-vars */
import Swup from 'swup'
import JsPlugin from '@swup/js-plugin'
import DebugPlugin from '@swup/debug-plugin'
import gsap from 'gsap'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

const swup = new Swup({
  containers: ['#main', '#overlay'],
  plugins: [
    new JsPlugin([
      {
        from: '(.*)',
        to: '(.*)',
        in: (next) => {
          const tl = gsap.timeline()

          tl.fromTo(document.getElementById('overlay'), {
            xPercent: 0,
            autoAlpha: 1
          }, {
            xPercent: 100,
            duration: 0.5,
            ease: 'power3.in',
            delay: 1
          })
          tl.fromTo(document.getElementById('main'), {
            opacity: 0,
            y: 100
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            onComplete: next,
            ease: 'back'
          })
        },
        out: (next) => {
          const tl = gsap.timeline()

          tl.fromTo(document.getElementById('main'), {
            opacity: 1,
            y: 0
          }, {
            opacity: 0,
            y: 100,
            duration: 0.5,
            ease: 'power3.out'
          })
          tl.fromTo(document.getElementById('overlay'), {
            xPercent: -100,
            autoAlpha: 1
          }, {
            xPercent: 0,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: next
          })
        }
      }
    ]),
    new DebugPlugin()
  ]
})

import flip from './flip'
import Swup from 'swup'
import SwupBodyClassPlugin from '@swup/body-class-plugin'
import SwupJsPlugin from '@swup/js-plugin'
import SwupDebugPlugin from '@swup/debug-plugin'
import SwupScrollPlugin from '@swup/scroll-plugin'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

/*!
 * Get all siblings of an element
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}  elem The element
 * @return {Array}      The siblings
 */
function getSiblings (elem) {
  return Array.from(elem.parentNode.children).filter(function (sibling) {
    return sibling !== elem
  })
}

let clickLink = null

const swup = new Swup({
  animateHistoryBrowsing: true,
  containers: [
    '#main'
  ],
  plugins: [
    new SwupBodyClassPlugin(),
    new SwupJsPlugin([
      {
        from: '(.*)', // meaning any
        to: '(.*)', // meaning any
        out: (next) => {
          const main = document.getElementById('main')
          // Web Animation API FTW!!!
          const animation = main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 })
          animation.onfinish = () => { next() }
        },
        in: (next) => {
          const main = document.getElementById('main')
          // Web Animation API FTW!!!
          const animation = main.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 })
          animation.onfinish = () => { next() }
        }
      },
      {
        from: '/', // From homepage
        to: '/articles/(.*)', // To article
        out: (next) => {
          // Create a clone of the target (the image)
          const clone = clickLink.cloneNode(true)
          clone.setAttribute('id', 'clone')

          // Load up the next page when the transition is done.
          clone.addEventListener('transitionend', () => {
            next()
          }, { once: true })

          // Do the flip!
          flip(() => {
            // Update the UI
            // We're using a clone element to make this more seamless
            document.querySelector('body').appendChild(clone)

            const main = document.getElementById('main')
            // Web Animation API FTW!!!
            const animation = main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 })
            animation.onfinish = () => {
              main.style.opacity = 0
              // Scroll here.
              // This helps hide the transition better.
              window.scrollTo({ top: 0 })
            }
          }, [clickLink], () => [clone])
        },
        in: (next) => {
          const clone = document.getElementById('clone')
          clone.remove()
          const content = document.querySelector('.content')
          content.style.opacity = 0
          // Web Animation API FTW!!!
          const animation = content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 300 })
          animation.onfinish = () => {
            content.removeAttribute('style')
            next()
          }
        }
      }
    ]),
    new SwupDebugPlugin(),
    new SwupScrollPlugin()
  ]
})

swup.on('clickLink', (event) => { clickLink = event.target })

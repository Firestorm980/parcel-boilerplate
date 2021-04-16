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
        from: '/',
        to: '/articles/(.*)',
        out: (next) => {
          const target = clickLink
          // Get the parent to apply the class
          const parent = target.closest('a')

          const parentListItem = target.closest('li')
          const siblingListItems = getSiblings(parentListItem)

          siblingListItems.forEach(item => {
            const animation = item.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 })
            animation.onfinish = () => {
              item.style.opacity = 0
            }
          })

          // For transitioning, we want the image to always be on top. This helps us keep the z-index managed.
          // We don't need data-transitioning after it finishes, so only run once.
          target.addEventListener('transitionend', () => {
            delete target.dataset.transitioning
            next()
          }, { once: true })

          // Do the flip!
          flip(() => {
            // Set transitioning for z-index management.
            target.dataset.transitioning = true

            window.scrollTo({ top: 0, behavior: 'smooth' })

            // Update the UI
            // Note, we're updating the parent here, but the image is the element that is manipulated in our script.
            if (parent.classList.contains('js-click')) {
              parent.classList.remove('js-click')
            } else {
              parent.classList.add('js-click')
            }
          }, [target])
        },
        in: (next) => {
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

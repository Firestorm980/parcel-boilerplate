import flip from './flip'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

document.addEventListener('click', (event) => {
  const { target } = event

  if (!target.matches('img')) {
    return
  }

  const div = target.parentElement

  target.addEventListener('transitionend', () => { delete target.dataset.transitioning }, { once: true })

  flip(() => {
    target.dataset.transitioning = true

    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (div.classList.contains('js-click')) {
      div.classList.remove('js-click')
    } else {
      div.classList.add('js-click')
    }
  }, [target])
})

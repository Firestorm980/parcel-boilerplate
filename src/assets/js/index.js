import flip from './flip'

document.querySelector('html').classList.remove('no-js')
document.querySelector('html').classList.add('js')

document.addEventListener('click', (event) => {
  const { target } = event

  // Only match the image
  if (!target.matches('img')) {
    return
  }

  // Get the parent to apply the class
  const div = target.parentElement

  // For transitioning, we want the image to always be on top. This helps us keep the z-index managed.
  // We don't need data-transitioning after it finishes, so only run once.
  target.addEventListener('transitionend', () => { delete target.dataset.transitioning }, { once: true })

  // Do the flip!
  flip(() => {
    // Set transitioning for z-index management.
    target.dataset.transitioning = true

    // Scroll to the top of the page. Not required, but possibly needed for the next part of our test (page loading!)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Update the UI
    // Note, we're updating the div here, but the image is the element that is manipulated in our script.
    if (div.classList.contains('js-click')) {
      div.classList.remove('js-click')
    } else {
      div.classList.add('js-click')
    }
  }, [target])
})

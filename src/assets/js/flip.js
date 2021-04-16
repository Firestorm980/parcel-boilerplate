const getRect = (el) => {
  return el.getBoundingClientRect()
}

/**
* FLIP
* F = First
* L = Last
* I = Invert
* P = Play
*/
export default function flip (doSomething, firstEls, getLastEls = () => firstEls) {
  // First
  const firstRects = firstEls.map(getRect)

  requestAnimationFrame(() => {
    // (something that changes layout)
    doSomething()

    // Last
    const lastEls = getLastEls()

    lastEls.forEach((lastEl, i) => {
      const firstRect = firstRects[i]
      const lastRect = getRect(lastEl)

      // Invert
      const dx = lastRect.x - firstRect.x
      const dy = lastRect.y - firstRect.y
      const dw = lastRect.width / firstRect.width
      const dh = lastRect.height / firstRect.height

      // (so CSS knows it's being flipped)
      // data-flipping="true"
      lastEl.dataset.flipping = true

      lastEl.style.setProperty('--dx', dx)
      lastEl.style.setProperty('--dy', dy)
      lastEl.style.setProperty('--dw', dw)
      lastEl.style.setProperty('--dh', dh)
    })

    requestAnimationFrame(() => {
      // Play
      lastEls.forEach(lastEl => {
        delete lastEl.dataset.flipping
      })
    })
  })
}

import { notify } from './observable'
import { renderer } from './renderer'

export const sizes = {
  width: 0,
  height: 0,
  devicePixelRatio: Math.min(window.devicePixelRatio, 2)
}

const setSizes = () => {
  if (!renderer.domElement) {
    return
  }

  if (renderer.domElement === window) {
    sizes.height = window.innerHeight
    sizes.width = window.innerWidth
  } else {
    const { width, height } = renderer.domElement.getBoundingClientRect()
    sizes.height = height
    sizes.width = width
  }

  notify('three:sizes', { sizes })
}

const handleWindowOnResize = () => {
  setSizes()
  notify('three:sizes', { sizes })
}

const bind = () => {
  window.addEventListener('resize', handleWindowOnResize)
}

const setup = () => {
  setSizes()
}

/**
 * Init
 */
export function init () {
  console.log('Sizes: init')
  setup()
  bind()
}

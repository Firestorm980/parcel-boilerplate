import * as THREE from 'three'
import { controllers } from '../controllers'
import menuLoader, { menuLoaderAnimation } from '../meshes/menuLoader'
import renderer from '../renderer'

let isSqueezing = false
let isSelecting = false
let timeout = null

const hideMenu = () => {
  clearTimeout(timeout)
  menuLoader.visible = false
}

const showMenu = () => {
  menuLoader.visible = true
  menuLoaderAnimation.seek(0).play()
  timeout = setTimeout(async () => {
    const XRsession = renderer.xr.getSession()

    if (XRsession) {
      await XRsession.end()
      menuLoader.visible = false
    }
  }, 3000)
}

const handleSqueezeStart = (event) => {
  isSqueezing = true

  if (isSqueezing && isSelecting) {
    showMenu()
  }
}

const handleSqueezeEnd = () => {
  isSqueezing = false

  if (timeout) {
    hideMenu()
  }
}

const handleSelectStart = (event) => {
  isSelecting = true

  if (isSqueezing && isSelecting) {
    showMenu()
  }
}

const handleSelectEnd = () => {
  isSelecting = false

  if (timeout) {
    hideMenu()
  }
}

const bind = () => {
  controllers.forEach((controller) => {
    // Trigger
    controller.addEventListener('selectstart', handleSelectStart)
    controller.addEventListener('selectend', handleSelectEnd)

    // // Grip
    controller.addEventListener('squeezestart', handleSqueezeStart)
    controller.addEventListener('squeezeend', handleSqueezeEnd)
  })
}

const setup = () => {
  menuLoaderAnimation.seek(0).pause()
  menuLoader.visible = false
}

const init = () => {
  setup()
  bind()
}

export default init

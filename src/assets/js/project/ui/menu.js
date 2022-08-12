import { controllers } from '../utils/controllers'
import { mesh as menuLoader, animation } from '../meshes/menuLoader'
import { Renderer } from '../utils'

let isSqueezing = false
let isSelecting = false
let timeout = null
let activeController = null

const hideMenu = () => {
  clearTimeout(timeout)

  activeController.remove(menuLoader)
  menuLoader.visible = false
}

const showMenu = (controller) => {
  activeController = controller
  activeController.add(menuLoader)

  menuLoader.position.y = 0.1
  menuLoader.visible = true

  animation.seek(0).play()

  timeout = setTimeout(async () => {
    const { renderer } = Renderer
    const XRSession = renderer.xr.getSession()

    // Check if there is an active session.
    if (!XRSession) {
      return
    }

    await XRSession.end()
    menuLoader.visible = false
  }, 3000)
}

const handleSqueezeStart = (controller) => {
  isSqueezing = true

  if (isSqueezing && isSelecting) {
    showMenu(controller)
  }
}

const handleSqueezeEnd = () => {
  isSqueezing = false

  if (timeout) {
    hideMenu()
  }
}

const handleSelectStart = (controller) => {
  isSelecting = true

  if (isSqueezing && isSelecting) {
    showMenu(controller)
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
    controller.addEventListener('selectstart', () => { handleSelectStart(controller) })
    controller.addEventListener('selectend', handleSelectEnd)

    // // Grip
    controller.addEventListener('squeezestart', () => { handleSqueezeStart(controller) })
    controller.addEventListener('squeezeend', handleSqueezeEnd)
  })
}

const setup = () => {
  animation.seek(0).pause()
}

/**
 * Init
 */
export function init () {
  setup()
  bind()
}

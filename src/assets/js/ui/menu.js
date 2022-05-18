import * as THREE from 'three'
import { controllers } from '../controllers'
import menuLoader from '../meshes/menuLoader'

let isSqueezing = false
let isSelecting = false
let timeout

const hideMenu = () => {
  clearTimeout(timeout)
  menuLoader.visible = false
}

const showMenu = () => {
  menuLoader.visible = true
  console.log(menuLoader)
  timeout = setTimeout(() => {
    console.log('show menu')
  }, 5000)
}

const handleSqueezeStart = (event) => {
  isSqueezing = true

  if (isSelecting) {
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

  if (isSqueezing) {
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

//   menuLoader.visible = false
}

const init = () => {
  setup()
  bind()
}

export default init

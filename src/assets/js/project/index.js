import WebXRPolyfill from 'webxr-polyfill'

import { Camera, Controls, Renderer, Sizes, emitEvent, Controllers } from './utils'
import { Main } from './scenes'
import Meshes from './meshes'
import Lights from './lights'

// eslint-disable-next-line no-unused-vars
const polyfill = new WebXRPolyfill()

let _target = null

const render = () => {
  const { camera } = Camera
  const { renderer } = Renderer
  const { scene } = Main

  emitEvent('three:render', { renderer, scene, camera }, _target)

  // Typical rendering.
  renderer.render(scene, camera)
}

const animate = () => {
  const { renderer } = Renderer
  // Special animation function for XR.
  renderer.setAnimationLoop(render)
}

const setup = () => {
  Main.init()
  Renderer.init(_target)
  Sizes.init(_target)
  Camera.init()
  Controls.init()
  Controllers.init()

  Meshes()
  Lights()

  render()
  animate()

  window.THREE_APP = {
    scene: Main.scene
  }
}

function init (target) {
  _target = target
  setup()
}

export default init
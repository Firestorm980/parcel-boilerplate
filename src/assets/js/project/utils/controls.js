import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cameras
import { camera } from './camera'
import { renderer } from './renderer'

export let controls = null

const handleElementOnRender = () => {
  controls.update()
}

const bind = () => {
  renderer.domElement.addEventListener('three:render', handleElementOnRender)
}

const setup = () => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = Infinity
  controls.enablePan = true
  controls.enableDamping = true
}

export const init = () => {
  console.log('Controls: init')
  setup()
  bind()
}

import * as THREE from 'three'
import { scene } from '../scenes/main'
import { sizes } from './sizes'

export let camera = null

const handleWindowOnResize = (event) => {
  const { detail } = event
  const { sizes } = detail
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
}

const bind = () => {
  window.addEventListener('three:resize', handleWindowOnResize)
}

const setup = () => {
  camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
  camera.position.set(0, 0, 3)

  scene.add(camera)
}

export function init () {
  console.log('Camera: init')
  setup()
  bind()
}

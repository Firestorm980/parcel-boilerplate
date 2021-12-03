import * as THREE from 'three'

import renderer from './renderer'
import camera from './camera'
import controls from './controls'

// Scenes
import scene from './scenes/main'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const clock = new THREE.Clock()

const handleWindowResize = () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  const event = new CustomEvent(
    'three:animate',
    {
      bubbles: true,
      cancelable: true,
      detail: {
        elapsedTime
      }
    }
  )

  renderer.domElement.dispatchEvent(event)

  // Update controls
  controls.update()

  // Update render
  renderer.render(scene, camera)

  // Keep calling
  requestAnimationFrame(animate)
}

const init = () => {
  window.addEventListener('resize', handleWindowResize)

  handleWindowResize()
  animate()
}

export default init

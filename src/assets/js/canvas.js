import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import WebXRPolyfill from 'webxr-polyfill'
import renderer from './renderer'
import camera from './camera'
import controls from './controls'
import { update as LightsUpdate, init as Lights } from './lights'
import { update as MeshesUpdate, init as Meshes } from './meshes'
import { update as ControllerUpdate, init as Controllers } from './controllers'
import { update as UIUpdate, init as UI } from './ui'

// Scenes
import scene from './scenes/main'

// eslint-disable-next-line no-unused-vars
const polyfill = new WebXRPolyfill()

/**
 * Handle window resize.
 */
const handleWindowOnResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = (window.innerWidth / window.innerHeight)
  camera.updateProjectionMatrix()
}

const init = () => {
  // Lights
  Lights()

  // Controllers
  Controllers()

  // Meshes
  Meshes()

  // UI
  // Includes all UI related functions.
  UI()

  // Window resize
  window.addEventListener('resize', handleWindowOnResize)

  const render = () => {
    // Update the flatscreen controls.
    controls.update()

    // Update our XR controllers.
    ControllerUpdate(renderer)

    UIUpdate(renderer)

    MeshesUpdate(renderer)

    LightsUpdate(renderer)

    // Typical rendering.
    renderer.render(scene, camera)
  }

  const animate = () => {
    // Special animation function for XR.
    renderer.setAnimationLoop(render)
  }

  animate()

  document.body.appendChild(VRButton.createButton(renderer))
}

export default init

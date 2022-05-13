import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'

import renderer from './renderer'
import camera from './camera'
import controls from './controls'
import { controllers, controllerUpdate, grips } from './controllers'

// Scenes
import scene from './scenes/main'

// Meshes
// import floor from './meshes/floor'
import skybox from './meshes/skybox'
import earth, { timeline } from './meshes/earth'

// Lights
import key from './lights/key'

const init = () => {
  // Lights
  const spaceAmbient = new THREE.AmbientLight('hsl(253, 30%, 2%)', 1)
  scene.add(spaceAmbient)
  scene.add(key)

  // Meshes
  scene.add(skybox)
  scene.add(earth)

  // Controllers
  controllers.forEach((controller) => {
    scene.add(controller)

    // Trigger
    controller.addEventListener('select', (event) => { console.log(event) })
    // controller.addEventListener('selectstart', (event) => { console.log(event) })
    // controller.addEventListener('selectend', (event) => { console.log(event) })

    // // Grip
    controller.addEventListener('squeeze', (event) => { console.log(event) })
    // controller.addEventListener('squeezestart', (event) => { console.log(event) })
    // controller.addEventListener('squeezeend', (event) => { console.log(event) })

    // Gamepad
    // These are extended controls that were added on top of THREE.
    controller.addEventListener('press', (event) => { console.log(event) })
    controller.addEventListener('touch', (event) => { console.log(event) })
    controller.addEventListener('value', (event) => { console.log(event) })
    controller.addEventListener('axes', (event) => { console.log(event) })
  })

  grips.forEach((grip) => {
    scene.add(grip)
  })

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth / window.innerHeight)
    camera.updateProjectionMatrix()
  })

  renderer.setClearColor('hsl(0, 100%, 50%)')
  renderer.setSize(window.innerWidth, window.innerHeight)

  const render = () => {
    // Update the flatscreen controls.
    controls.update()

    // Update our XR controllers.
    controllerUpdate(renderer)

    // Play any animations with GSAP.
    timeline.play()

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

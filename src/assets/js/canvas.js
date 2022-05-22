import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import WebXRPolyfill from 'webxr-polyfill'
import renderer from './renderer'
import camera from './camera'
import controls from './controls'
import { controllers, controllerUpdate, grips } from './controllers'
import UI from './ui'

// Scenes
import scene from './scenes/main'

// Meshes
// import floor from './meshes/floor'
import skybox from './meshes/skybox'
import earth from './meshes/earth'
import floor from './meshes/floor'

// Lights
import key from './lights/key'
import menuLoader, { menuLoaderUpdate } from './meshes/menuLoader'

// eslint-disable-next-line no-unused-vars
const polyfill = new WebXRPolyfill()

const init = () => {
  // Lights
  const spaceAmbient = new THREE.AmbientLight('hsl(253, 30%, 2%)', 1)
  scene.add(spaceAmbient)
  scene.add(key)
  // const light = new THREE.HemisphereLight(new THREE.Color('white'), new THREE.Color('gray'), 1)
  // scene.add(light)

  // Meshes
  scene.add(skybox)
  scene.add(earth)
  // scene.add(floor)
  scene.add(menuLoader)

  // Controllers
  UI()
  controllers.forEach((controller) => {
    scene.add(controller)

    // Trigger
    // controller.addEventListener('select', (event) => { console.log(event) })
    controller.addEventListener('selectstart', (event) => { console.log(event) })
    controller.addEventListener('selectend', (event) => { console.log(event) })

    // // Grip
    // controller.addEventListener('squeeze', (event) => { console.log(event) })
    controller.addEventListener('squeezestart', (event) => { console.log(event) })
    controller.addEventListener('squeezeend', (event) => { console.log(event) })

    // Gamepad
    // These are extended controls that were added on top of THREE.
    controller.addEventListener('press', (event) => { console.log(event) })
    controller.addEventListener('pressstart', (event) => { console.log(event) })
    controller.addEventListener('pressend', (event) => { console.log(event) })
    // controller.addEventListener('touchstart', (event) => { console.log(event) })
    // controller.addEventListener('touchend', (event) => { console.log(event) })
    // controller.addEventListener('value', (event) => { console.log(event) })
    // controller.addEventListener('axes', (event) => { console.log(event) })
  })

  grips.forEach((grip) => {
    scene.add(grip)
  })

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth / window.innerHeight)
    camera.updateProjectionMatrix()
  })

  const render = () => {
    // Update the flatscreen controls.
    controls.update()

    // Update our XR controllers.
    controllerUpdate(renderer)

    // Update loader
    menuLoaderUpdate()

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

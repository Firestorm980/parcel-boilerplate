import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cameras
import camera from './cameras/camera'

// Scenes
import scene from './scenes/main'

// Meshes
import skybox from './scenes/skybox'
import earth from './meshes/earth'

// Lights
import key from './lights/key'

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('canvas')
  })
  renderer.shadowMap.enabled = true
  renderer.gammaOutput = true
  renderer.physicallyCorrectLights = true

  // Lights
  scene.add(new THREE.AmbientLight('hsl(253, 30%, 2%)', 0.2))
  scene.add(key)

  // Meshes
  scene.add(skybox)
  scene.add(earth)

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth / window.innerHeight)
    camera.updateProjectionMatrix()
  })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 149600)
  controls.minDistance = 2
  controls.maxDistance = Infinity
  controls.enablePan = false
  controls.enableDamping = true

  renderer.setClearColor('hsl(0, 100%, 50%)')
  renderer.setSize(window.innerWidth, window.innerHeight)

  const animate = () => {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(scene, camera)
  }

  animate()
}

export default init

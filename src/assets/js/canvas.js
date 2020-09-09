import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
import scene from './scene'

// Meshes
import skybox from './meshes/skybox'
import earth from './meshes/earth'

// Lights
import key from './lights/key'

const init = () => {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000000)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('canvas')
  })
  renderer.shadowMap.enabled = true
  renderer.gammaFactor = 2.2
  renderer.gammaOutput = true
  renderer.physicallyCorrectLights = true

  camera.position.set(0, 0, 100)

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
  controls.target.set(0, 0, 0)
 	// controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 70
  controls.maxDistance = Infinity
  controls.enablePan = false
  controls.update()

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

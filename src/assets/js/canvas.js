import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
import scene from './scene'

// Meshes
import floor from './meshes/floor'
import ball from './meshes/ball'

// Lights
import key from './lights/key'

const init = () => {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('canvas')
  })
  renderer.shadowMap.enabled = true

  camera.position.set(0, 0, 100)

  const helper = new THREE.CameraHelper(camera)
  // scene.add(helper)

  // Lights
  scene.add(new THREE.AmbientLight('hsl(0,0%,10%)'))
  scene.add(key)

  // Meshes
  scene.add(floor)
  scene.add(ball)

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth / window.innerHeight)
    camera.updateProjectionMatrix()
  })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.maxPolarAngle = Math.PI / 2
  controls.minDistance = 40
  controls.maxDistance = 200
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

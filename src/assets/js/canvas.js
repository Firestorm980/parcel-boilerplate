import * as THREE from 'three'

import renderer from './renderer'
import camera from './camera'
import controls from './controls'

// Scenes
import scene from './scenes/main'

// Meshes
import skybox from './scenes/skybox'
import earth from './meshes/earth'

// Lights
import key from './lights/key'

export const goTo = () => {
  console.log(earth.children)
  const { x, y, z } = earth.children[0].position
  camera.position.set(x, y, z)
  controls.target.set(x, y, z)
}

const init = () => {
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

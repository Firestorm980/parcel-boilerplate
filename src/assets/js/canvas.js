import * as THREE from 'three'

import renderer from './renderer'
import camera from './camera'
import controls from './controls'
import { params } from './gui'

// Scenes
import scene from './scenes/main'

// Meshes
import floor from './meshes/floor'
import skybox from './meshes/skybox'
import earth, { timeline, earthMaterial } from './meshes/earth'

// Lights
import key from './lights/key'

const init = () => {
  // Lights
  const spaceAmbient = new THREE.AmbientLight('hsl(253, 30%, 2%)', 1)
  const constructAmbient = new THREE.AmbientLight('hsl(0, 0%, 100%)', 1)
  scene.add(spaceAmbient)
  scene.add(constructAmbient)
  scene.add(key)

  // Meshes
  const placeholder = new THREE.Mesh(
    new THREE.SphereBufferGeometry(1, 32, 32),
    new THREE.MeshLambertMaterial({ color: new THREE.Color('red') })
  )

  scene.add(floor)
  scene.add(skybox)
  scene.add(earth)
  scene.add(placeholder)

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = (window.innerWidth / window.innerHeight)
    camera.updateProjectionMatrix()
  })

  renderer.setClearColor('hsl(0, 100%, 50%)')
  renderer.setSize(window.innerWidth, window.innerHeight)

  console.log(key)

  const animate = () => {
    requestAnimationFrame(animate)

    controls.update()

    floor.visible = (!params.showSkyBox)
    skybox.visible = (params.showSkyBox)

    key.children[0].visible = (params.showLensFlare)
    constructAmbient.visible = (params.useConstructLighting)
    spaceAmbient.visible = (!params.useConstructLighting)

    if (params.rotate) {
      timeline.play()
    } else {
      timeline.pause()
    }

    earth.visible = (params.showLand)
    placeholder.visible = (!params.showLand)
    earth.children[1].visible = (params.showClouds)

    earthMaterial.bumpScale = 0

    renderer.render(scene, camera)
  }

  animate()
}

export default init

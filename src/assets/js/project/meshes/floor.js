import * as THREE from 'three'
import { scene } from '../scenes/main'

import { textureLoader } from '../utils'

const setup = () => {
  const texture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/grid-1024.png')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(616, 616)

  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('white'),
    map: texture,
    transparent: true
  })

  const geometry = new THREE.PlaneBufferGeometry(10000, 10000)
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.y = -2
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true

  scene.add(mesh)
}

export function init () {
  setup()
}

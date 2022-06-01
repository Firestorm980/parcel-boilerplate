import * as THREE from 'three'
import { scene } from '../scenes/main'

const setup = () => {
  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('red')
  })

  const geometry = new THREE.SphereBufferGeometry(1, 32, 32)
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
}

export function init () {
  setup()
}

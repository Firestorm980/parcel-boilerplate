import * as THREE from 'three'
import { scene } from '../scenes/main'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

const setup = () => {
  const group = new THREE.Group()
  const color = new THREE.Color('#111111')
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 1,
    roughness: 0.25
  })

  const geometry = new RoundedBoxGeometry(0.8, 0.8, 0.8, 2, 0.1)
  const box = new THREE.Mesh(geometry, material)

  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      const boxInstance = box.clone()
      boxInstance.material = box.material.clone()
      boxInstance.position.x = x
      boxInstance.position.z = z
      group.add(boxInstance)
    }
  }

  group.position.x = -5
  group.position.z = -5

  scene.add(group)
}

export function init () {
  setup()
}

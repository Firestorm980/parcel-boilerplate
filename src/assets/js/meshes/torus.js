import * as THREE from 'three'

import renderer from '../renderer'

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  new THREE.MeshNormalMaterial()
)

renderer.domElement.addEventListener('three:animate', (event) => {
  const { detail } = event
  const { elapsedTime } = detail

  torus.rotation.y = 0.1 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime
})

export default torus

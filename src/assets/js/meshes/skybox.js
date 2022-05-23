import * as THREE from 'three'

// Assets
import stars from '../../images/Milky_Way.jpg'
import scene from '../scenes/main'

export const mesh = new THREE.Group()

const bind = () => {

}

const setup = () => {
  const geometry = new THREE.SphereBufferGeometry(10000000, 60, 40)
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1)

  const texture = new THREE.TextureLoader().load(stars)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    lightMap: texture,
    lightMapIntensity: 1.5
  })
  const skybox = new THREE.Mesh(geometry, material)

  mesh.add(skybox)

  mesh.name = 'Skybox'

  scene.add(mesh)
}

/**
 * Update when rendering.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function update (renderer) {

}

/**
 * Init
 */
export function init () {
  setup()
  bind()
}

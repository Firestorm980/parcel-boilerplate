import * as THREE from 'three'

// Assets
import stars from '../../images/Milky_Way.jpg'

const geometry = new THREE.SphereBufferGeometry(10000000, 60, 40)
// invert the geometry on the x-axis so that all of the faces point inward
geometry.scale(-1, 1, 1)

const texture = new THREE.TextureLoader().load(stars)
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
  lightMap: texture,
  lightMapIntensity: 1.5,
  transparent: true
})
const mesh = new THREE.Mesh(geometry, material)

export default mesh

import * as THREE from 'three'

import lunaMap from '../../images/luna/moon_2k.jpg'
import lunaBump from '../../images/luna/moon_topo_2k.jpg'
import { textureLoader, convertKilometersToUnits } from '../utils'

export const animation = null
export const mesh = new THREE.Group()
const radius = 1738
const scaledRadius = convertKilometersToUnits(radius)

const bind = () => {

}

const setup = () => {
  const geometry = new THREE.SphereBufferGeometry(scaledRadius, 32, 32)

  // Land
  const material = new THREE.MeshPhongMaterial({
    map: textureLoader.load(lunaMap),
    bumpMap: textureLoader.load(lunaBump),
    bumpScale: 0.0025
  })

  const luna = new THREE.Mesh(geometry, material)

  mesh.add(luna)

  mesh.receiveShadow = true
  mesh.castShadow = true
  mesh.name = 'Luna'
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

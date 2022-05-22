import * as THREE from 'three'
import scene from '../scenes/main'

export let light = null

const bind = () => {

}

const setup = () => {
  light = new THREE.AmbientLight('hsl(253, 30%, 2%)', 1)

  scene.add(light)
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

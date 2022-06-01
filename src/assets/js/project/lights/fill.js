import * as THREE from 'three'
import { scene } from '../scenes/main'

export let light = null

const setup = () => {
  light = new THREE.AmbientLight(new THREE.Color('white'), 0.25)

  scene.add(light)
}

export function init () {
  setup()
}

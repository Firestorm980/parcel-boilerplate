import * as THREE from 'three'
import { scene } from '../scenes/main'

export let light = null

const setup = () => {
  light = new THREE.DirectionalLight(new THREE.Color('white'), 1)
  light.castShadow = true

  scene.add(light)
}

export function init () {
  setup()
}

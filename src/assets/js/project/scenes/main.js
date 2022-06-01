import * as THREE from 'three'

export const scene = new THREE.Scene()

const setup = () => {
  const color = new THREE.Color('white')
  scene.background = color
  scene.fog = new THREE.Fog(color, 10, 80)
}

export function init () {
  setup()
}

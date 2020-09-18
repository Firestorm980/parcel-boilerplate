import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('canvas')
})
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.physicallyCorrectLights = true

export default renderer

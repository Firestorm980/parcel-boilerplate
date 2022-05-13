import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('canvas')
})
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
renderer.xr.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding

export default renderer

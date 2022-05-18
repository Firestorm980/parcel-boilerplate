import * as THREE from 'three'

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('canvas')
})
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
renderer.xr.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setClearColor('hsl(0, 100%, 50%)')
renderer.setSize(window.innerWidth, window.innerHeight)

export default renderer

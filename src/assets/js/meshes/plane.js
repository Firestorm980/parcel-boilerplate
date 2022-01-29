import * as THREE from 'three'

import renderer from '../renderer'
import vertexShader from '../shaders/plane.vert.glsl'
import fragmentShader from '../shaders/plane.frag.glsl'

const geometry = new THREE.PlaneGeometry(10, 10, 100, 100)

const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uBigWavesElevation: { value: 0.2 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },
    uDepthColor: { value: new THREE.Color('#186691') },
    uSurfaceColor: { value: new THREE.Color('#9bd8ff') },
    uColorMultiplier: { value: 2 },
    uColorOffset: { value: 0.01 }
  },
  // wireframe: true
})

const plane = new THREE.Mesh(
  geometry,
  material
)

plane.rotation.set(-90 * Math.PI / 180, 0, 0)

renderer.domElement.addEventListener('three:animate', (event) => {
  const { detail } = event
  const { elapsedTime } = detail

  material.uniforms.uTime.value = elapsedTime

  // plane.rotation.y = 0.1 * elapsedTime
  // plane.rotation.x = 0.15 * elapsedTime
})

export default plane

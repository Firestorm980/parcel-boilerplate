import * as THREE from 'three'
import gsap from 'gsap'
import fragmentShader from '../shaders/circleProgress.frag'
import camera from '../camera'

const menuProgressUniforms = {
  u_progress: { type: 'f', value: 0.0 },
  u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  u_colorBackground: { type: 'v3', value: new THREE.Color('#111') },
  u_colorForeground: { type: 'v3', value: new THREE.Color('#ffffff') }
}

const menuProgressGeometry = new THREE.PlaneGeometry(1, 1)
const menuProgressMaterial = new THREE.ShaderMaterial({
  uniforms: menuProgressUniforms,
  fragmentShader,
  vertexShader: `
    varying vec2 v_Uv;
    void main() {
        v_Uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  transparent: true
})

const menuProgress = new THREE.Mesh(menuProgressGeometry, menuProgressMaterial)
const menuLoader = new THREE.Group()

export const menuLoaderUpdate = () => {
  const position = new THREE.Vector3()
  position.setFromMatrixPosition(camera.matrixWorld)
  menuLoader.lookAt(position)
}

export const menuLoaderAnimation = gsap.fromTo(
  menuProgressUniforms.u_progress,
  { value: 0 },
  {
    value: 100,
    duration: 3,
    ease: 'linear'
  }
)

menuLoader.add(menuProgress)

menuLoader.visible = false

window.addEventListener('resize', () => {
  menuProgressUniforms.u_resolution.value.x = window.innerWidth
  menuProgressUniforms.u_resolution.value.y = window.innerHeight
})

export default menuLoader

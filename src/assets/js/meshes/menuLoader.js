import * as THREE from 'three'
import gsap from 'gsap'
import fragmentShader from '../shaders/menuLoader.frag'
import camera from '../camera'
import scene from '../scenes/main'

const menuProgressUniforms = {
  u_progress: { type: 'f', value: 0.0 },
  u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  u_colorBackground: { type: 'v3', value: new THREE.Color('#111') },
  u_colorForeground: { type: 'v3', value: new THREE.Color('#ffffff') }
}

export let animation = null
export let mesh = new THREE.Group()

const handleWindowOnResize = () => {
  menuProgressUniforms.u_resolution.value.x = window.innerWidth
  menuProgressUniforms.u_resolution.value.y = window.innerHeight
}

const bind = () => {
  window.addEventListener('resize', handleWindowOnResize)
}

const setup = () => {
  const menuProgressGeometry = new THREE.PlaneGeometry(0.1, 0.1)
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

  mesh = new THREE.Group()
  mesh.add(menuProgress)
  mesh.visible = false

  scene.add(mesh)

  animation = gsap.fromTo(
    menuProgressUniforms.u_progress,
    { value: 0 },
    {
      value: 100,
      duration: 3,
      ease: 'linear'
    }
  )
}

/**
 * Update when rendering.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function update (renderer) {
  const { position } = renderer.xr.getCamera()
  mesh.lookAt(position)
}

/**
 * Init
 */
export function init () {
  setup()
  bind()
}

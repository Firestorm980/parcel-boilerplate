import * as THREE from 'three'
import gsap from 'gsap'
import fragmentShader from '../shaders/menuLoader.frag'
import { controllers } from '../utils/controllers'
import { Renderer } from '../utils'
import { subscribe } from '../utils/observable'
import { scene } from '../scenes/main'

let isSqueezing = false
let isSelecting = false
let timeout = null
let activeController = null
let animation = null
let mesh = new THREE.Group()

const menuProgressUniforms = {
  u_progress: { type: 'f', value: 0.0 },
  u_resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  u_colorBackground: { type: 'v3', value: new THREE.Color('#111') },
  u_colorForeground: { type: 'v3', value: new THREE.Color('#ffffff') }
}

const hideMenu = () => {
  clearTimeout(timeout)

  activeController.remove(mesh)
  mesh.visible = false
}

const showMenu = (controller) => {
  activeController = controller
  activeController.add(mesh)

  mesh.position.y = 0.1
  mesh.visible = true

  animation.seek(0).play()

  timeout = setTimeout(async () => {
    const { renderer } = Renderer
    const XRSession = renderer.xr.getSession()

    // Check if there is an active session.
    if (!XRSession) {
      return
    }

    await XRSession.end()
    mesh.visible = false
  }, 3000)
}

const handleSqueezeStart = (controller) => {
  isSqueezing = true

  if (isSqueezing && isSelecting) {
    showMenu(controller)
  }
}

const handleSqueezeEnd = () => {
  isSqueezing = false

  if (timeout) {
    hideMenu()
  }
}

const handleSelectStart = (controller) => {
  isSelecting = true

  if (isSqueezing && isSelecting) {
    showMenu(controller)
  }
}

const handleSelectEnd = () => {
  isSelecting = false

  if (timeout) {
    hideMenu()
  }
}

const handleOnWindowResize = ({ sizes }) => {
  menuProgressUniforms.u_resolution.value.x = sizes.width
  menuProgressUniforms.u_resolution.value.y = sizes.height
}

const handleOnRender = ({ renderer }) => {
  const { position } = renderer.xr.getCamera()
  mesh.lookAt(position)
}

const bind = () => {
  subscribe('three:sizes', handleOnWindowResize)
  subscribe('three:render', handleOnRender)
  controllers.forEach((controller) => {
    // Trigger
    controller.addEventListener('selectstart', () => { handleSelectStart(controller) })
    controller.addEventListener('selectend', handleSelectEnd)

    // // Grip
    controller.addEventListener('squeezestart', () => { handleSqueezeStart(controller) })
    controller.addEventListener('squeezeend', handleSqueezeEnd)
  })
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
  ).seek(0).pause()
}

/**
 * Init
 */
export function init () {
  setup()
  bind()
}

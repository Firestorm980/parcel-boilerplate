import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton'

export let renderer = null

let _target = null

const handleOnSizes = (event) => {
  const { detail } = event
  const { sizes } = detail
  renderer.setSize(sizes.width, sizes.height, false)
}

const bind = () => {
  window.addEventListener('three:sizes', handleOnSizes)
}

const setup = () => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: _target,
    alpha: true
  })
  renderer.shadowMap.enabled = true
  renderer.physicallyCorrectLights = true
  renderer.xr.enabled = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setClearColor('white')
  document.body.appendChild(VRButton.createButton(renderer))
}

export function init (target) {
  console.log('Renderer: init')
  _target = target
  setup()
  bind()
}

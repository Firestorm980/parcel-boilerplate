import * as THREE from 'three'
import gsap from 'gsap'

// Assets
import earthMap from '../../images/8081_earthmap4k.jpg'
import earthBumpMap from '../../images/8081_earthbump4k.jpg'
import earthSpecMap from '../../images/8081_earthspec4k.jpg'
import earthLightMap from '../../images/8081_earthlights4k.jpg'
import clouds from '../../images/earth_clouds_2048.png'
import scene from '../scenes/main'

let land = null
let sky = null

export let animation = null
export const mesh = new THREE.Group()

const bind = () => {

}

const setup = () => {
  const scale = 0.25

  const earthGeometry = new THREE.SphereBufferGeometry(scale, 32, 32)
  const textureLoader = new THREE.TextureLoader()

  // Land
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(earthMap),
    bumpMap: textureLoader.load(earthBumpMap),
    bumpScale: 0.0025,
    specularMap: textureLoader.load(earthSpecMap),
    specular: new THREE.Color('hsl(210, 80%, 10%)'),
    emissiveMap: textureLoader.load(earthLightMap),
    emissiveIntensity: 1,
    emissive: new THREE.Color('hsl(0, 0%, 5%)')
  })

  land = new THREE.Mesh(earthGeometry, earthMaterial)

  // Sky
  const skyMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(clouds),
    blending: THREE.AdditiveBlending
  })

  sky = new THREE.Mesh(earthGeometry, skyMaterial)
  sky.scale.set(1.006, 1.006, 1.006)

  mesh.add(land)
  mesh.add(sky)

  mesh.position.set(0, 1, -0.25)

  mesh.receiveShadow = true
  mesh.castShadow = true

  scene.add(mesh)

  animation = gsap
    .timeline()
    .fromTo(land.rotation, { y: 0 }, { y: 360, duration: 2400, ease: 'linear', repeat: -1 }, 'start')
    .fromTo(sky.rotation, { y: 0 }, { y: 360, duration: 2300, ease: 'linear', repeat: -1 }, 'start')
}

/**
 * Update when rendering.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function update (renderer) {

}

/**
 * Init
 */
export function init () {
  setup()
  bind()
}

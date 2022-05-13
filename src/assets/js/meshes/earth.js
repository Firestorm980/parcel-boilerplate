import * as THREE from 'three'

// Assets
import earthMap from '../../images/8081_earthmap4k.jpg'
import earthBumpMap from '../../images/8081_earthbump4k.jpg'
import earthSpecMap from '../../images/8081_earthspec4k.jpg'
import clouds from '../../images/earth_clouds_2048.png'
import { TimelineMax } from 'gsap/gsap-core'

const scale = 0.25

const earthGeometry = new THREE.SphereBufferGeometry(scale, 32, 32)

// Land
export const earthMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load(earthMap),
  bumpMap: new THREE.TextureLoader().load(earthBumpMap),
  bumpScale: 0.0075,
  specularMap: new THREE.TextureLoader().load(earthSpecMap),
  specular: new THREE.Color('white')
})
const land = new THREE.Mesh(earthGeometry, earthMaterial)

// Sky
const skyMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(clouds),
  transparent: true,
  side: THREE.DoubleSide,
  blending: THREE.NormalBlending
})
const sky = new THREE.Mesh(earthGeometry, skyMaterial)
sky.scale.set(1.01, 1.01, 1.01)

const planet = new THREE.Group()

planet.add(land)
planet.add(sky)

planet.position.set(0, 1, -0.25)

planet.receiveShadow = true
planet.castShadow = true

export const timeline = new TimelineMax()

timeline
  .fromTo(land.rotation, { y: 0 }, { y: 360, duration: 2400, ease: 'linear', repeat: -1 }, 'start')
  .fromTo(sky.rotation, { y: 0 }, { y: 360, duration: 2300, ease: 'linear', repeat: -1 }, 'start')

export default planet

import * as THREE from 'three'
import { TweenLite } from 'gsap'

// Assets
import earthMap from '../../images/8081_earthmap4k.jpg'
import earthBumpMap from '../../images/8081_earthbump4k.jpg'
import earthSpecMap from '../../images/8081_earthspec4k.jpg'
import clouds from '../../images/earth_clouds_2048.png'

// Land
const base = new THREE.TextureLoader().load(earthMap)
const bump = new THREE.TextureLoader().load(earthBumpMap)
const specular = new THREE.TextureLoader().load(earthSpecMap)
const earthMaterial = new THREE.MeshPhongMaterial({
  map: base,
  bumpMap: bump,
  bumpScale: 0.1,
  specularMap: specular,
  specular: new THREE.Color('hsl(0,0%,25%)')
})
const earthGeometry = new THREE.SphereBufferGeometry(63.71, 32, 32)

// Sky
const skyMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(clouds),
  transparent: true,
  side: THREE.DoubleSide
})
const skyGeometry = new THREE.SphereBufferGeometry(63.8, 32, 32)

const land = new THREE.Mesh(earthGeometry, earthMaterial)
const sky = new THREE.Mesh(skyGeometry, skyMaterial)

const earth = new THREE.Group()

earth.add(land)
earth.add(sky)

earth.position.set(0, 0, 0)
earth.receiveShadow = true
earth.castShadow = true

TweenLite.fromTo(earth.rotation, { y: 0 }, { y: 360, duration: 24000, ease: 'linear', repeat: -1 })

export default earth

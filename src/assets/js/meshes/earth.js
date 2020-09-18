import * as THREE from 'three'
import { TweenLite } from 'gsap'
import { createOrbit } from '../helpers'

// Assets
import earthMap from '../../images/8081_earthmap4k.jpg'
import earthBumpMap from '../../images/8081_earthbump4k.jpg'
import earthSpecMap from '../../images/8081_earthspec4k.jpg'
import earthLights from '../../images/8081_earthlights4k.jpg'
import clouds from '../../images/earth_clouds_2048.png'

import lightsShader from '../shaders/lights'
import atmoShader from '../shaders/atmosphere'
import glowShader from '../shaders/glow'

const earthGeometry = new THREE.SphereBufferGeometry(1.2742, 32, 32)

// Land
const earthMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load(earthMap),
  bumpMap: new THREE.TextureLoader().load(earthBumpMap),
  bumpScale: 0.001,
  specularMap: new THREE.TextureLoader().load(earthSpecMap),
  specular: new THREE.Color('hsl(200,100%,80%)'),
  roughness: 0.75,
  metalness: 0.5
})
const land = new THREE.Mesh(earthGeometry, earthMaterial)

// Lights
const lightsMaterial = new THREE.MeshBasicMaterial({
  color: new THREE.Color('white'),
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthTest: false,
  map: new THREE.TextureLoader().load(earthLights)
})

// const lightsMaterial = new THREE.ShaderMaterial(lightsShader)
const lights = new THREE.Mesh(earthGeometry, lightsMaterial)

// Sky
const skyMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load(clouds),
  transparent: true,
  side: THREE.DoubleSide,
  blending: THREE.NormalBlending
})

const sky = new THREE.Mesh(earthGeometry, skyMaterial)
sky.scale.set(1.001, 1.001, 1.001)

const atmo = new THREE.Mesh(earthGeometry, new THREE.ShaderMaterial(glowShader))
atmo.scale.set(1.015, 1.015, 1.015)

const orbitRadius = 149600
const earthOrbit = createOrbit(orbitRadius, 'red')

const earthSystem = new THREE.Group()
const earth = new THREE.Group()

earth.add(land)
// earth.add(lights)
earth.add(sky)
earth.add(atmo)

earth.position.set(0, 0, orbitRadius)
earth.receiveShadow = true
earth.castShadow = true

TweenLite.fromTo(earth.rotation, { y: 0 }, { y: 360, duration: 24000, ease: 'linear', repeat: -1 })

// Combine planet with orbit
earthSystem.add(earth)
earthSystem.add(earthOrbit)

export default earthSystem

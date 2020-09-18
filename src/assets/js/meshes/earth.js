import * as THREE from 'three'
import { TweenLite } from 'gsap'
import { createOrbit } from '../helpers'

// Assets
import earthMap from '../../images/8081_earthmap4k.jpg'
import earthBumpMap from '../../images/8081_earthbump4k.jpg'
import earthSpecMap from '../../images/8081_earthspec4k.jpg'
import earthLights from '../../images/8081_earthlights4k.jpg'
import clouds from '../../images/earth_clouds_2048.png'
import moonMap from '../../images/moon_2k.jpg'
import moonBumpMap from '../../images/moon_topo_2k.jpg'

import glowShader from '../shaders/glow'

const earthGeometry = new THREE.SphereBufferGeometry(0.6371, 32, 32)
const earthOrbitRadius = 14960
const moonGeometry = new THREE.SphereBufferGeometry(0.17374, 16, 16)
const moonOrbitRadius = 38.4399

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

// Atmosphere
const atmo = new THREE.Mesh(earthGeometry, new THREE.ShaderMaterial(glowShader))
atmo.scale.set(1.015, 1.015, 1.015)

const earthOrbit = createOrbit(earthOrbitRadius, 'red')
earthOrbit.name = 'Orbit:Earth'
const earth = new THREE.Group()
const earthSystem = new THREE.Group()
earthSystem.name = 'System:Earth'
const planet = new THREE.Group()

planet.add(land)
// planet.add(lights)
planet.add(sky)
planet.add(atmo)

planet.receiveShadow = true
planet.castShadow = true
planet.name = 'Body:Earth'

TweenLite.fromTo(land.rotation, { y: 0 }, { y: 360, duration: 2400, ease: 'linear', repeat: -1 })
TweenLite.fromTo(sky.rotation, { y: 0 }, { y: 360, duration: 2400, ease: 'linear', repeat: -1 })

const moon = new THREE.Mesh(
  moonGeometry,
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(moonMap),
    bumpMap: new THREE.TextureLoader().load(moonBumpMap),
    bumpScale: 0.001
  })
)
moon.position.set(0, 0, moonOrbitRadius)
moon.name = 'Body:Moon'

const moonSystem = new THREE.Group()
moonSystem.name = 'System:Moon'
const moonOrbit = createOrbit(moonOrbitRadius, 'orange')
moonOrbit.name = 'Orbit:Moon'

moonSystem.add(moon)
moonSystem.add(moonOrbit)

TweenLite.fromTo(moonSystem.rotation, { y: 0 }, { y: 360, duration: 65500, ease: 'linear', repeat: -1 })

earthSystem.add(planet)
earthSystem.add(moonSystem)

// Combine planet with orbit
earthSystem.position.set(0, 0, earthOrbitRadius)
earth.add(earthSystem)
earth.add(earthOrbit)

export default earth

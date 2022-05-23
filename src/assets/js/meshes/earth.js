import * as THREE from 'three'
import gsap from 'gsap'

// Assets
import earthMap from '../../images/8081_earthmap4k.jpg'
import earthBumpMap from '../../images/8081_earthbump4k.jpg'
import earthSpecMap from '../../images/8081_earthspec4k.jpg'
import earthLightMap from '../../images/8081_earthlights4k.jpg'
import clouds from '../../images/earth_clouds_2048.png'
import scene from '../scenes/main'
import { controllers, getIntersections } from '../controllers'

let land = null
let sky = null

export let animation = null
export const mesh = new THREE.Group()

// Need to keep track of this on a per controller basis.
const intersecting = new Map()

const bind = () => {
  controllers.forEach(controller => {
    // This is basically how a "hover" state would work with our mesh.
    // Groups can't be intersected, so we need to watch a child or children of the group.
    // Since we're using a simple sphere, this is easy.
    controller.addEventListener('intersect', (event) => {
      const intersections = getIntersections(controller)

      // Make an array of UUIDs. This'll be faster to compare.
      const uuids = intersections.map(intersection => intersection.object.uuid)

      // Specific per controller boolean.
      const isIntersecting = intersecting.get(controller)
      const { uuid } = sky

      // If the mesh is being intersected and that's changed
      if (uuids.includes(uuid) && uuids[0] === uuid && !isIntersecting) {
        intersecting.set(controller, true)
        // Same as mouseenter
        console.log('intersectstart')
      }

      // If the mesh isn't being intersected and that's changed
      if (!uuids.includes(uuid) && isIntersecting) {
        intersecting.set(controller, false)
        // Same as mouseleave
        console.log('intersectend')
      }
    })

    // Listening to the events on the controller and then looking to see if they might apply to this mesh.
    // This is easier than binding to the mesh directly and more performant (less listeners on other things).
    controller.addEventListener('select', (event) => {
      const isIntersecting = intersecting.get(controller)

      // Thanks to our 'intersect' binding, we know when this mesh is being pointed at.
      // If it isn't, don't bother.
      if (!isIntersecting) {
        return
      }

      console.log('sky has been selected')
    })
  })
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
  land.name = 'Earth - land'

  // Sky
  const skyMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(clouds),
    blending: THREE.AdditiveBlending
  })

  sky = new THREE.Mesh(earthGeometry, skyMaterial)
  sky.scale.set(1.006, 1.006, 1.006)
  sky.name = 'Earth - sky'

  mesh.add(land)
  mesh.add(sky)

  mesh.position.set(0, 1, -0.25)

  mesh.receiveShadow = true
  mesh.castShadow = true
  mesh.name = 'Earth'

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

import * as THREE from 'three'
import { TweenLite } from 'gsap'

// Assets
import earthmap from '../../images/8081_earthmap4k.jpg'

const texture = new THREE.TextureLoader().load(earthmap)
const material = new THREE.MeshLambertMaterial({ map: texture })
const geometry = new THREE.SphereBufferGeometry(20, 32, 32)
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 0, 0)
mesh.receiveShadow = true
mesh.castShadow = true

TweenLite.fromTo(mesh.rotation, { y: 0 }, { y: 360, duration: 1000, ease: 'linear', repeat: -1 })

export default mesh

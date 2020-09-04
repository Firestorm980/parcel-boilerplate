import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color().setHSL(0.6, 0, 1)
scene.fog = new THREE.Fog(scene.background, 1, 5000)

export default scene

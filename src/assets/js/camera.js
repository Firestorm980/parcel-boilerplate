import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 100000)
camera.position.set(2, 1, 2)

export default camera

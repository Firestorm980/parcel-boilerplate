import * as THREE from 'three'

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000000)

camera.position.set(0, 0, 149605)

export default camera

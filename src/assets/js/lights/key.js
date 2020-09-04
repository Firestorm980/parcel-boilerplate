import * as THREE from 'three'

const d = 300
const light = new THREE.DirectionalLight('hsl(0, 0%, 100%)', 1)

light.position.set(50, 200, 100)
light.position.multiplyScalar(1.3)
light.castShadow = true
light.shadow.mapSize.width = 2048
light.shadow.mapSize.height = 2048
light.shadow.camera.left = -d
light.shadow.camera.right = d
light.shadow.camera.top = d
light.shadow.camera.bottom = -d
light.shadow.camera.far = 1000

export default light

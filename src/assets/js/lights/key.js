import * as THREE from 'three'

const d = 300
const light = new THREE.PointLight('hsl(44, 30%, 87%)', 1)

light.position.set(0, 0, 1520000)
light.castShadow = true
light.shadow.mapSize.width = 2048
light.shadow.mapSize.height = 2048
light.shadow.camera.left = -d
light.shadow.camera.right = d
light.shadow.camera.top = d
light.shadow.camera.bottom = -d
light.power = 40000000

export default light

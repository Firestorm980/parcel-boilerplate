import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cameras
import renderer from './renderer'
import camera from './camera'

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 2
controls.maxDistance = Infinity
controls.enablePan = true
controls.enableDamping = true

export default controls

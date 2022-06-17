import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loadingManager = new THREE.LoadingManager()
export const gltfLoader = new GLTFLoader(loadingManager)
export const textureLoader = new THREE.TextureLoader(loadingManager)
export const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

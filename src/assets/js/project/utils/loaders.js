import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const gltfLoader = new GLTFLoader()
export const textureLoader = new THREE.TextureLoader()
export const cubeTextureLoader = new THREE.CubeTextureLoader()

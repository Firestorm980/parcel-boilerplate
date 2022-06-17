import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

const loadingManager = new THREE.LoadingManager()
export const gltfLoader = new GLTFLoader(loadingManager)
export const textureLoader = new THREE.TextureLoader(loadingManager)
export const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
export const objectLoader = new THREE.ObjectLoader(loadingManager)
export const materialLoader = new THREE.MaterialLoader(loadingManager)
export const fontLoader = new FontLoader(loadingManager)
export const objLoader = new OBJLoader(loadingManager)
export const svgLoader = new SVGLoader(loadingManager)

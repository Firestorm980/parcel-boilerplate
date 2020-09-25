import * as THREE from 'three'

import flare0 from '../../images/lensflare0.png'
import flare3 from '../../images/lensflare3.png'

import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'

const light = new THREE.PointLight('hsl(44, 30%, 87%)', 10)

light.position.set(0, 0, 10)
light.castShadow = true
light.shadow.mapSize.width = 2048
light.shadow.mapSize.height = 2048

const textureLoader = new THREE.TextureLoader()

const textureFlare0 = textureLoader.load(flare0)
const textureFlare3 = textureLoader.load(flare3)

const lensflare = new Lensflare()

lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color))
lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6))
lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7))
lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9))
lensflare.addElement(new LensflareElement(textureFlare3, 70, 1))

light.add(lensflare)

export default light

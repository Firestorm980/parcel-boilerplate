import * as THREE from 'three'
import { scene } from '../scenes/main'

const setup = () => {
  // const material = new THREE.MeshLambertMaterial({
  //   color: new THREE.Color('red')
  // })

  const material = new THREE.ShaderMaterial({
    fragmentShader: `
      uniform float u_time;
      varying vec2 v_Uv;
      void main() {
        vec3 color = vec3(1.0, 0.0, 0.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    vertexShader: `
      uniform float u_time;
      varying vec2 v_Uv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
      }
    `,
    uniforms: {
      u_time: { type: 'f', value: 0.0 }
    }
  })

  const geometry = new THREE.SphereBufferGeometry(1, 32, 32)
  const mesh = new THREE.Mesh(geometry, material)

  mesh.castShadow = true

  scene.add(mesh)
}

export function init () {
  setup()
}

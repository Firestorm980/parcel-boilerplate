import * as THREE from 'three'

import camera from '../cameras/camera'

const shader = {
  side: THREE.FrontSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
  uniforms: THREE.UniformsUtils.merge([
    THREE.UniformsLib.common,
    THREE.UniformsLib.lights,
    {
      c: { type: 'f', value: 0 },
      p: { type: 'f', value: 1.5 },
      glowColor: { type: 'c', value: new THREE.Color('hsl(207, 85%, 20%)') },
      viewVector: { type: 'v3', value: camera.position }
    }
  ]),
  vertexShader: `
  uniform vec3 viewVector;
  uniform float c;
  uniform float p;
  varying float intensity;
  void main()
  {
    vec3 vNormal = normalize( normalMatrix * normal );
    vec3 vNormel = normalize( normalMatrix * viewVector );
    intensity = pow( c - dot(vNormal, vNormel), p );

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,

  fragmentShader: `
  uniform vec3 glowColor;
  varying float intensity;
  void main()
  {
    vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
  }
  `
}

export default shader

import * as THREE from 'three'
import earthLights from '../../images/8081_earthlights4k.jpg'

const shader = {
  side: THREE.DoubleSide,
  transparent: true,
  lights: true,
  uniforms: THREE.UniformsUtils.merge([

    THREE.UniformsLib.common,
    THREE.UniformsLib.lights,
    {
      map: new THREE.TextureLoader().load(earthLights)
    }
  ]),
  vertexShader: `
  /**
  * Example Vertex Shader
  * Sets the position of the vertex by setting gl_Position
  */

  // Set the precision for data types used in this shader
  precision highp float;
  precision highp int;

  // Examples of variables passed from vertex to fragment shader
	varying vec3 vPosition;
	varying vec3 vNormal;
	varying vec2 vUv;
	varying vec2 vUv2;

  void main() {

	${THREE.ShaderChunk.beginnormal_vertex}
    ${THREE.ShaderChunk.defaultnormal_vertex}

	  // This sets the position of the vertex in 3d space. The correct math is
	  // provided below to take into account camera and object data.
	  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }`,

  fragmentShader: `
  /**
  * Example Fragment Shader
  * Sets the color and alpha of the pixel by setting gl_FragColor
  */

  // Set the precision for data types used in this shader
  precision highp float;
	precision highp int;

	uniform mat4 modelMatrix;
	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;
	uniform mat3 normalMatrix;

	uniform vec3 lightPosition;
	varying vec3 vPosition;
	varying vec2 vUv;
	varying vec2 vUv2;

	${THREE.ShaderChunk.common}
	${THREE.ShaderChunk.bsdfs}
	${THREE.ShaderChunk.lights_pars_begin}
	${THREE.ShaderChunk.lights_phong_pars_fragment}

	uniform sampler2D map;

  void main() {

	// Calculate the real position of this pixel in 3d space, taking into account
	// the rotation and scale of the model. It's a useful formula for some effects.
	// This could also be done in the vertex shader
	vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;

	// Calculate the normal including the model rotation and scale
	vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );

	vec3 lightVector = normalize( lightPosition - worldPosition );

	// An example simple lighting effect, taking the dot product of the normal
	// (which way this pixel is pointing) and a user generated light position
	float brightness = dot( worldNormal, lightVector );

	vec4 tex = texture2D( map, vUv );

	gl_FragColor = vec4( tex.r, tex.g, tex.b, brightness );
  }`
}

export default shader

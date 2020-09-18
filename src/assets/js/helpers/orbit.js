import * as THREE from 'three'

export const createOrbit = (radius, color, inclination = Math.PI / 2) => {
  var resolution = radius + 15 * 50 // segments in the line
  var length = 360 / resolution
  var orbitLine = new THREE.Geometry()
  var material = new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    linewidth: 1,
    fog: true
  })

  // Build the orbit line
  for (var i = 0; i <= resolution; i++) {
    var segment = (i * length) * Math.PI / 180
    var orbitAmplitude = radius

    orbitLine.vertices.push(
      new THREE.Vector3(
        Math.cos(segment) * orbitAmplitude,
        Math.sin(segment) * orbitAmplitude,
        0
      )
    )
  }

  var line = new THREE.Line(orbitLine, material)

  line.position.set(0, 0, 0)
  line.rotation.set(inclination, 0, 0)

  return line
}

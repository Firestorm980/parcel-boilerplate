import * as dat from 'dat.gui'

export const params = {
// Scene
  showSkyBox: false,

  // Mesh
  showLand: false,
  showSpecular: false,
  showBump: false,
  showClouds: false,
  rotate: false,

  // Lights
  showLensFlare: false,
  useConstructLighting: true
}

const init = () => {
  const gui = new dat.GUI()

  const sceneGUI = gui.addFolder('Scene')
  const meshGUI = gui.addFolder('Mesh')

  const lightsGUI = gui.addFolder('Lights')
  sceneGUI.add(params, 'showSkyBox')

  meshGUI.add(params, 'showLand')
  meshGUI.add(params, 'showSpecular')
  meshGUI.add(params, 'showBump')
  meshGUI.add(params, 'showClouds')
  meshGUI.add(params, 'rotate')

  lightsGUI.add(params, 'showLensFlare')
  lightsGUI.add(params, 'useConstructLighting')

  gui.open()
}

export default init

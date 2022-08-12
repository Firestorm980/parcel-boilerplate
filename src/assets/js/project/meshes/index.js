import { init as Floor } from './floor'
import { init as Sphere } from './sphere'
import { init as Boxes } from './boxes'

const setup = () => {
  // Floor()
  Sphere()
  // Boxes()
}

/**
 * Init
 */
export function init () {
  console.log('Meshes: init')
  setup()
}

export default init

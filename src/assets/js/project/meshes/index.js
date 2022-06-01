import { init as Floor } from './floor'
import { init as Sphere } from './sphere'

const setup = () => {
  Floor()
  Sphere()
}

/**
 * Init
 */
export function init () {
  console.log('Meshes: init')
  setup()
}

export default init

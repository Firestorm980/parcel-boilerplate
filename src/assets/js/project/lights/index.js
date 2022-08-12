import { init as Fill } from './fill'
import { init as Key } from './key'

const setup = () => {
  Fill()
  Key()
}

/**
 * Init
 */
export function init () {
  console.log('Lights: init')
  setup()
}

export default init

import { init as Menu } from './menu'

const setup = () => {
  Menu()
}

/**
 * Init
 */
export function init () {
  console.log('UI: init')
  setup()
}

export default init

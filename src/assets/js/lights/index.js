import { init as Fill } from './fill'
import { init as Key } from './key'

const setup = () => {
  Fill()
  Key()
}

/**
 * Update when rendering.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function update (renderer) {

}

/**
 * Init
 */
export function init () {
  setup()
}

export default init

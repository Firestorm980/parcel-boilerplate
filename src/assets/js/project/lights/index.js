import { init as Fill } from './fill'

const setup = () => {
  Fill()
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
  console.log('Lights: init')
  setup()
}

export default init

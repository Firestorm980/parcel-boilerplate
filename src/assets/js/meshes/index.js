import { init as Skybox } from './skybox'
import { init as Earth } from './earth'
import { init as MenuLoader, update as MenuLoaderUpdate } from './menuLoader'

const setup = () => {
  Skybox()
  Earth()
  MenuLoader()
}

/**
 * Update when rendering.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function update (renderer) {
  MenuLoaderUpdate(renderer)
}

/**
 * Init
 */
export function init () {
  setup()
}

export default init

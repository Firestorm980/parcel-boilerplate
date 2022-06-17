import * as dat from 'dat.gui'

export const debug = new dat.GUI()

const bind = () => {

}

const setup = () => {
  debug.open()
}

export function init () {
  const active = window.location.hash === '#debug'

  if (!active) {
    return
  }

  console.log('Debug: init')
  setup()
  bind()
}

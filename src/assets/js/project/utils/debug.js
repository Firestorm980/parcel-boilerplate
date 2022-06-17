import * as dat from 'dat.gui'
import Stats from 'stats.js'

export const debug = new dat.GUI()
export const stats = new Stats()

const bind = () => {

}

const setup = () => {
  document.body.appendChild(stats.dom)
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

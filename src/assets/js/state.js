import observable from './observable'

const defaultState = {
  value: '',
  count: 0
}

const state = new Proxy(defaultState, {
  set (state, key, value) {
    const oldState = { ...state }

    state[key] = value

    observable.notify('state', { state, oldState })

    return state
  }
})

export const set = (newState) => {
  for (const key in newState) {
    if (Object.hasOwnProperty.call(newState, key)) {
      const value = newState[key]

      state[key] = value
    }
  }
}

export const listen = (callback) => {
  observable.subscribe('state', ({ state, oldState }) => {
    callback(state, oldState)
  })
}

export default state

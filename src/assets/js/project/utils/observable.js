const events = {}

export function subscribe (name, callback) {
  if (!Object.prototype.hasOwnProperty.call(events, name)) {
    events[name] = []
  }

  events[name].push(callback)
}

export function unsubscribe (name, callback) {
  if (!Object.prototype.hasOwnProperty.call(events, name)) {
    console.warn(`Cannot unsubscribe from "${name}". The event name "${name}" does not exist in the event subscription array. Check you are notifying an existing subscribed event name.`)
    return
  }

  events[name] = events[name].filter(subscriber => subscriber !== callback)
}

export function notify (name, data) {
  if (!Object.prototype.hasOwnProperty.call(events, name)) {
    console.warn(`Cannot notify ${name}. The event name "${name}" does not exist in the event subscription array. Check you are notifying an existing subscribed event name.`)
    return
  }

  events[name].forEach(callback => callback(data))
}

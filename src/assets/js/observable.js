class Observable {
  constructor () {
    this.events = {}
  }

  subscribe (name, callback) {
    const self = this

    if (!Object.prototype.hasOwnProperty.call(self.events, name)) {
      self.events[name] = []
    }

    self.events[name].push(callback)
  }

  unsubscribe (name, callback) {
    const self = this

    if (!Object.prototype.hasOwnProperty.call(self.events, name)) {
      console.warn(`Cannot unsubscribe from "${name}". The event name "${name}" does not exist in the event subscription array. Check you are notifying an existing subscribed event name.`)
      return
    }

    self.events[name] = self.events[name].filter(subscriber => subscriber !== callback)
  }

  notify (name, data) {
    const self = this

    if (!Object.prototype.hasOwnProperty.call(self.events, name)) {
      console.warn(`Cannot notify ${name}. The event name "${name}" does not exist in the event subscription array. Check you are notifying an existing subscribed event name.`)
      return
    }

    console.log(`Notify: ${name}`, self.events, self.events[name])

    self.events[name].forEach(callback => callback(data))
  }
}

export default new Observable()

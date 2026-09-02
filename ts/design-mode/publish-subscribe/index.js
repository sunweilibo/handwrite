let nextId = 1

export class Subscribe {
  constructor(name = 'subscriber') {
    this.name = name
    this.id = nextId++
  }

  listen({ publisher, message, handler }) {
    if (publisher instanceof Publisher) {
      this[message + '_' + publisher.id + '_handler'] = handler
      publisher.addListener(this, message)
    }
    return this
  }

  unlisten(publisher, message) {
    if (publisher instanceof Publisher) {
      publisher.removeListener(this, message)
      delete this[message + '_' + publisher.id + '_handler']
    }
    return this
  }
}

export class Publisher {
  constructor(name = 'publisher') {
    this.messageMap = {}
    this.id = nextId++
    this.name = name
  }

  addListener(subscriber, message) {
    if (!subscriber || !message) {
      return false
    }
    if (!this.messageMap[message]) {
      this.messageMap[message] = []
    }

    const existInde = this.messageMap[message].findIndex(exitSubscriber => exitSubscriber.id === subscriber.id)

    if (existInde === -1) {
      this.messageMap[message].push(subscriber)
    }
    return true
  }

  removeListener(subscriber, message) {
    const listeners = this.messageMap[message]
    if (!listeners) return false

    const index = listeners.findIndex(listener => listener.id === subscriber.id)
    if (index === -1) return false
    listeners.splice(index, 1)
    if (listeners.length === 0) delete this.messageMap[message]
    return true
  }

  publish(message, payload) {
    const listeners = this.messageMap[message] || []
    for (const subscriber of [...listeners]) {
      const handler = subscriber[message + '_' + this.id + '_handler']
      if (typeof handler === 'function') {
        handler.call(subscriber, payload)
      }
    }
    return listeners.length
  }
}

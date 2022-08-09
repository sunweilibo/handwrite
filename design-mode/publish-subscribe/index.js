class Subscribe {
  constructor(name = 'subscriber') {
    this.name = name
    this.id = +new Date()
  }

  listen({ publisher, message, handler }) {
    if (publisher instanceof Publisher) {
      this[message + '_' + publisher.id + '_handler'] = handler
      publisher.addListener(this, message)
    }
    return this
  }

  unlisten(pulisher, message) {
    if (publisher instanceof Publisher) {
      publisher.removeListener(this, message)
    }
    return this
  }
}

class Publisher {
  constructor(name = 'publisher') {
    this.messageMap = {}
    this.id = +new Date()
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
    } else {
      let handlerKey = message + "_" + this.id + "_handler";
      this.messageMap[message][existIndex] = subscriber;
    }
  }
}
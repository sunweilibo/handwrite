function Observable(cb) {
  const subscribe = next => cb({next})
  return { subscribe }
}

// usage example
const saysWorld = new Observable(observe => observe.next('world'))
saysWorld.subscribe(x => console.log('hello', x)) // 'hello world'
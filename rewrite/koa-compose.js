function compose(middlewares) {
  if (!Array.isArray(middlewares)) {
    throw new Error('middlewares must be an array')
  }
  if (middlewares.some(middleware => typeof middleware !== 'function')) {
    throw new Error('middleware must be a function')
  }

  return function(context, next) {
    let index = -1
    return dispatch(0)

    function dispatch(i) {
      if (i<index) {
        return Promise.reject(new Error('can not be called more than once'))
      }
      index = i
      const handler = middleware[i]
      
      if (i === middlewares.length) {
        handler = next
      }

      if (!fn) {
        return Promise.resolve()
      }

      return new Promise.resolve(handler(context, dispatch.bind(null, i+1)))
    }
  }
}
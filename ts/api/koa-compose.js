// https://github.com/koajs/compose/blob/master/index.js
export function compose(middlewares) {
  if (!Array.isArray(middlewares)) {
    throw new TypeError('middlewares must be an array')
  }
  
  for (const fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('middlewares must be composed of functions')
    }
  }

  return function (context, next) {
    let index = -1
    return dispatch(0)

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next called multiple times'))
      }
      index = i
      let fn = middlewares[i]
      if (i === middlewares.length) {
        fn = next
      }
      if (!fn) {
        return Promise.resolve()
      }
      try{
        return Promise.resolve(fn(context, dispatch.bind(null, i+1)))
      } catch(e) {
        return Promise.reject(e)
      }
    }
  }
}

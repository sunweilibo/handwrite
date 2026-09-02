// 节流
export function throttle(fn, delay, {start = false, end = true} = {}) {
  let lastInvokeTime = start ? 0 : Date.now()
  let timer = null
  let pendingArgs
  let pendingContext

  return function (...args) {
    const context = this
    const remaining = delay - (Date.now() - lastInvokeTime)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastInvokeTime = Date.now()
      return fn.apply(context, args)
    }

    if (end) {
      pendingArgs = args
      pendingContext = context
    }

    if (end && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastInvokeTime = Date.now()
        fn.apply(pendingContext, pendingArgs)
        pendingArgs = pendingContext = undefined
      }, remaining)
    }
  }
}

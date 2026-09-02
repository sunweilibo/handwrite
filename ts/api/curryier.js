export function curry(fun) {
  const len = fun.length

  return function curried(...args) {
    const context = this

    function collect(collectedArgs) {
      if (collectedArgs.length >= len) {
        return fun.apply(context, collectedArgs)
      }
      return (...nextArgs) => {
        return collect(collectedArgs.concat(nextArgs))
      }
    }

    return collect(args)
  }
}

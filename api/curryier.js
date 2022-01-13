function curry(fun) {
  const len = fun.length

  return function t(...args) {
    if (args.length < len) {
      return function (...args2) {
        return t.apply(this, args.concat(args2))
      }
    } else {
      return fun.apply(this, args)
    }
  }
}

function add(x,y,z) {
  return x+y+z
}

const curriedAdd = curry(add)

const res = curriedAdd(1,2)(3)
console.log("🚀 ~ file: curryier.js ~ line 23 ~ res1", res)


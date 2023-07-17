const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function VPromise(executor) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  this.onResolveCallback = []
  this.onRejectedCallback = []

  const me = this

  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED
      me.value = value
      queueMicrotask(() => {
        me.onResolveCallback.forEach(cb => cb(value))
      })
    }
  }

  function reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED
      me.reason = reason
      queueMicrotask(() => {
        me.onRejectedCallback.forEach(cb => cb(reason)) 
      })
    }
  }

  try{
    executor(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

VPromise.prototype.then = function(onFulfilled, onRejected) {
  const me = this
  const onFulfilledCallback = typeof onFulfilled === 'function' ? onFulfilled : value => value
  const onRejectedCallback = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

  let promise2 = new VPromise((resolve, reject) => {
    if (me.status === FULFILLED) {
      queueMicrotask(() => {
        try {
          let x = onFulfilledCallback(me.value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    } else if (me.status === REJECTED) {
      queueMicrotask(() => {
        try {
          let y = onRejectedCallback(me.reason)
          resolve(y)
        } catch (e) {
          reject(e)
        }
      })
    } else {
      me.onRejectedCallback.push((reason) => {
        try{
          let x = onRejectedCallback(reason)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
      me.onResolveCallback.push((value) => {
        try{
          let y = onFulfilledCallback(value)
          resolve(y)
        } catch (e) {
          reject(e)
        }
      })
    }
  })
  return promise2
}
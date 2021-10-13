const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function VPromise(executor) {
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  this.onResolveCallback = undefined
  this.onRejectedCallback = undefined

  const me = this

  function resolve(value) {
    if (me.status === PENDING) {
      me.status = FULFILLED
      me.value = value
      me.onResolveCallback && me.onResolveCallback(value)
    }
  }

  function reject(reason) {
    if (me.status === PENDING) {
      me.status = REJECTED
      me.reason = reason
      me.onRejectedCallback && me.onRejectedCallback(reason)
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

  if (me.status === FULFILLED) {
    onFulfilledCallback(me.value)
  } else if (me.status === REJECTED) {
    onRejectedCallback(me.value)
  } else {
    me.onRejectedCallback = onRejectedCallback
    memm.onResolveCallback = onFulfilledCallback
  }
}
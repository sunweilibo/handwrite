import test from 'node:test'
import assert from 'node:assert/strict'

import { Observable } from '../api/Observable.js'
import { curry } from '../api/curryier.js'
import { deepClone, perfDeepClone } from '../api/deepClone.js'
import { getMonthDays, getMonthDays2 } from '../api/getDate.js'
import { compose } from '../api/koa-compose.js'
import { VPromise } from '../api/promise.js'
import { throttle } from '../api/throttle.js'
import { Publisher, Subscribe } from '../design-mode/publish-subscribe/index.js'

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

test('curry accepts arguments in different groupings and preserves this', () => {
  const sum = curry(function (a, b, c) { return this.offset + a + b + c })
  const context = { offset: 10, sum }

  assert.equal(context.sum(1)(2)(3), 16)
  assert.equal(context.sum(1, 2)(3), 16)
  assert.equal(context.sum(1, 2, 3), 16)
})

for (const [name, clone] of [['deepClone', deepClone], ['perfDeepClone', perfDeepClone]]) {
  test(`${name} recursively clones objects and arrays`, () => {
    const source = { value: null, nested: { count: 1 }, list: [{ id: 1 }] }
    const result = clone(source)

    assert.deepEqual(result, source)
    assert.notEqual(result, source)
    assert.notEqual(result.nested, source.nested)
    assert.notEqual(result.list, source.list)
    assert.notEqual(result.list[0], source.list[0])
  })
}

test('month day helpers handle leap years', () => {
  for (const fn of [getMonthDays, getMonthDays2]) {
    assert.equal(fn(2024, 2), 29)
    assert.equal(fn(2023, 2), 28)
    assert.equal(fn(2024, 4), 30)
    assert.equal(fn(2024, 12), 31)
  }
})

test('Observable forwards values to its subscriber', () => {
  const observable = new Observable(observer => observer.next('world'))
  let received
  observable.subscribe(value => { received = value })
  assert.equal(received, 'world')
})

test('compose validates middleware and runs downstream then upstream', async () => {
  assert.throws(() => compose('invalid'), /array/)
  assert.throws(() => compose([() => {}, null]), /functions/)

  const calls = []
  const run = compose([
    async (context, next) => { calls.push(1); context.count++; await next(); calls.push(4) },
    async (context, next) => { calls.push(2); context.count++; await next(); calls.push(3) }
  ])
  const context = { count: 0 }

  await run(context)
  assert.deepEqual(calls, [1, 2, 3, 4])
  assert.equal(context.count, 2)
})

test('compose rejects when next is called more than once', async () => {
  const run = compose([async (_context, next) => { await next(); await next() }])
  await assert.rejects(run({}), /multiple times/)
})

test('VPromise resolves, rejects and chains callbacks asynchronously', async () => {
  const order = []
  const fulfilled = new VPromise(resolve => resolve(2))
  const chained = fulfilled.then(value => { order.push('callback'); return value * 3 })
  order.push('sync')

  assert.equal(await new Promise((resolve, reject) => chained.then(resolve, reject)), 6)
  assert.deepEqual(order, ['sync', 'callback'])

  const rejected = new VPromise((_resolve, reject) => reject(new Error('failure')))
  await assert.rejects(
    new Promise((resolve, reject) => rejected.then(resolve, reject)),
    /failure/
  )
})

test('throttle supports leading and trailing calls', async () => {
  const leadingCalls = []
  const leading = throttle(value => leadingCalls.push(value), 25, { start: true, end: false })
  leading(1)
  leading(2)
  assert.deepEqual(leadingCalls, [1])

  const trailingCalls = []
  const trailing = throttle(value => trailingCalls.push(value), 25)
  trailing(1)
  trailing(2)
  assert.deepEqual(trailingCalls, [])
  await wait(40)
  assert.deepEqual(trailingCalls, [2])
})

test('publisher notifies each subscriber once and supports unlisten', () => {
  const publisher = new Publisher('news')
  const first = new Subscribe('first')
  const second = new Subscribe('second')
  const received = []

  first.listen({ publisher, message: 'update', handler: value => received.push(['first', value]) })
  first.listen({ publisher, message: 'update', handler: value => received.push(['first-new', value]) })
  second.listen({ publisher, message: 'update', handler: value => received.push(['second', value]) })

  assert.equal(publisher.publish('update', 1), 2)
  assert.deepEqual(received, [['first-new', 1], ['second', 1]])

  first.unlisten(publisher, 'update')
  assert.equal(publisher.publish('update', 2), 1)
  assert.deepEqual(received.at(-1), ['second', 2])
})

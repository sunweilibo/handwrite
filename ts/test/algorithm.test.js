import test from 'node:test'
import assert from 'node:assert/strict'

import { DFS, DFS1, BFS, DFSS } from '../algorithm/DFS.js'
import { bubbleSort } from '../algorithm/sort/bubble.ts'
import { gbsort, gb_merge } from '../algorithm/sort/gb.ts'
import { insertSort } from '../algorithm/sort/insert.ts'
import { quick } from '../algorithm/sort/quick.ts'

const tree = () => ({
  index: 0,
  children: [
    { index: 1, children: [{ index: 2 }] },
    { index: 3 },
    { index: 4, children: [{ index: 5 }] }
  ]
})

test('DFS implementations visit nodes in pre-order without mutating the tree', () => {
  const root = tree()
  const original = structuredClone(root)

  assert.deepEqual(DFS(root).map(node => node.index), [0, 1, 2, 3, 4, 5])
  assert.deepEqual(DFS1(root).map(node => node.index), [0, 1, 2, 3, 4, 5])
  assert.deepEqual(DFSS(root), [0, 1, 2, 3, 4, 5])
  assert.deepEqual(root, original)
})

test('BFS visits nodes level by level', () => {
  assert.deepEqual(BFS(tree()).map(node => node.index), [0, 1, 3, 4, 2, 5])
  assert.deepEqual(BFS(null), [])
})

for (const [name, sort] of [
  ['bubbleSort', bubbleSort],
  ['gbsort', gbsort],
  ['insertSort', insertSort],
  ['quick', quick]
]) {
  test(`${name} sorts empty, duplicate and negative values`, () => {
    assert.deepEqual(sort([]), [])
    assert.deepEqual(sort([3, -1, 3, 0, 2]), [-1, 0, 2, 3, 3])
  })
}

test('merge combines two sorted arrays', () => {
  assert.deepEqual(gb_merge([1, 3, 5], [2, 4, 6]), [1, 2, 3, 4, 5, 6])
})

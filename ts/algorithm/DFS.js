export function DFS(node, nodeList = []) {
  if (!node) return nodeList;
  nodeList.push(node)
  const children = node.children || []
  for(let i=0; i<children.length; i++) {
    DFS(node.children[i], nodeList)
  }
  return nodeList
}

export function DFS1(node) {
  if (!node) return []
  const stacks = []
  const nodes = []
  stacks.push(node)
  while(stacks.length) {
    const lastNode = stacks.pop()
    nodes.push(lastNode)
    let children = lastNode.children || []
    stacks.push.apply(stacks, [...children].reverse())
  }
  return nodes
}

export function BFS(node) {
  if (!node) return []
  const nodes = []
  const stacks = []
  stacks.push(node)
  while(stacks.length) {
    const firstNode = stacks.shift()
    nodes.push(firstNode)
    const children = firstNode.children || []
    stacks.push.apply(stacks, children)
  }
  return nodes
}

export function DFSS(node) {
  if (!node) return []
  const r = []
  const stacks = []
  stacks.push(node)
  while(stacks.length) {
    const c = stacks.shift()
    r.push(c.index)
    const cl = c.children || []
    stacks.unshift.apply(stacks, cl)
  }
  return r
}

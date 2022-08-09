function DFS(node, nodeList = []) {
  if (!node) return nodeList;
  nodeList.push(node)
  const children = node.children || []
  for(let i=0; i<children.length; i++) {
    DFS(node.children[i], nodeList)
  }
}

function DFS1(node) {
  if (!node) return []
  const stacks = []
  const nodes = []
  stacks.push(node)
  while(stacks.length) {
    const lastNode = stacks.pop()
    nodes.push(lastNode)
    let children = lastNode.children || []
    stacks.push.apply(stacks, children.reverse())
  }
  return nodes
}

function BFS(node) {
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

// obj
let obj = { 
  children: [
    { 
      index: 0, 
      children: [
        { 
          index: 1, 
          children: [
            { 
              index: 3 
            }
          ] 
        }
      ] 
    }, 
    { 
      index: 4 
    }, 
    { 
      index: 5, 
      children: [
        { 
          index: 7, 
          children: [
            { 
              index: 8 
            }
          ] 
        }
      ] 
    }, 
    { 
      index: 6 
    }
  ] 
}

console.log(DFS1(obj));

const numbers = [5, 6, 2, 3, 7];

// 使用 Math.min/Math.max 以及 apply 函数时的代码
let max = Math.max.apply(null, numbers);
console.log(max);
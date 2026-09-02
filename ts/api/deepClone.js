export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const res = Array.isArray(obj) ? [] : {}
  for (const key of Object.keys(obj)) {
    res[key] = deepClone(obj[key])
  }
  return res
}

// 针对 for...in 效率低使用 while 进行优化
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
      iteratee(array[index], index);
  }
  return array;
}

export function perfDeepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const res = Array.isArray(obj) ? [] : {}
  const keys = Object.keys(obj)
  forEach(keys, key => {
    res[key] = perfDeepClone(obj[key])
  })
  return res
}

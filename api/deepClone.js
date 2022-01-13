function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else {
    const res = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
      res[key] = deepClone(obj[key])
    }  
  }
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

function perfDeepClone(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else {
    const isArray = Array.isArray(obj)
    let res = isArray ? [] : {}
    const keys = isArray ? undefined : Object.keys(obj)
    if (isArray) {
      forEach(keys || obj, (value, key) => {
        if (keys) {
          key = value
        }
        res[key] = perfDeepClone(obj[key])
      }) 
    }
    for(let key in obj) {
      res[key] = deepClone(obj[key])
    }  
  }
}
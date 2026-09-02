export function gbsort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr || [];
  }
  const index = Math.floor(arr.length / 2);
  const leftPart = gbsort(arr.slice(0, index));
  const rightPart = gbsort(arr.slice(index));
  return gb_merge(leftPart, rightPart);
}

export function gb_merge(arr1: number[], arr2: number[]): number[] {
  let arr = [];
  const len1 = arr1.length;
  const len2 = arr2.length;
  let i = 0;
  let j = 0;
  while (i < len1 && j < len2) {
    if (arr1[0] < arr2[0]) {
      arr.push(arr1.shift() as number);
      i++;
    } else {
      arr.push(arr2.shift() as number);
      j++;
    }
  }
  if (i < len1) {
    arr = arr.concat(arr1);
  } else {
    arr = arr.concat(arr2);
  }
  return arr;
}

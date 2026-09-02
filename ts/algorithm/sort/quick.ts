export function quick(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const base = arr[0];

  const left: number[] = [];
  const right: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quick(left), base, ...quick(right)];
}

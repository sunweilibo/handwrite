export function Observable(cb) {
  const subscribe = next => cb({next})
  return { subscribe }
}

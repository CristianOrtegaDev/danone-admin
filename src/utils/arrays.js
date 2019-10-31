export const swapArrayElements = function(a, x, y) {
  if (a.length === 1) return a
  a.splice(y, 1, a.splice(x, 1, a[y])[0])
  return a
}

export const areDatesDifferent = (d1, d2) =>
  d1.getDate() !== d2.getDate() ||
  d1.getMonth() !== d2.getMonth() ||
  d1.getFullYear() !== d2.getFullYear()

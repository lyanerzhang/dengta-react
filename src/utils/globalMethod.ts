export const getTableHeight = (element: HTMLElement | null): number => {
  if (!element) return 400
  return window.innerHeight - element.offsetTop - 85
}

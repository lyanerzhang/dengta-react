export const calculateXAxisInterval = (dataLength: number): number => {
  if (dataLength <= 10) return 0
  if (dataLength <= 30) return Math.ceil(dataLength / 20)
  return Math.ceil(dataLength / 5)
}

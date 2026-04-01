export const getDatesBetween = (
  startDate: string,
  endDate: string,
  delimiter = "-"
): string[] => {
  const dateArray: string[] = []
  const currentDate = new Date(startDate)
  const endDateObj = new Date(endDate)

  while (currentDate <= endDateObj) {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getDate()).padStart(2, "0")
    dateArray.push([year, month, day].join(delimiter))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dateArray
}

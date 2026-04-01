export function formatCurrentDateTime(): string {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const seconds = now.getSeconds().toString().padStart(2, "0")
  return `${month}月${day}日${hours}:${minutes}:${seconds}`
}

export function formatDateToChinese(dateString: string): string {
  if (!dateString) return ""
  const dateParts = dateString.split("-")
  if (dateParts.length !== 3) return dateString
  return `${dateParts[0]}年${dateParts[1]}月${dateParts[2]}日`
}

export function extractTimePart(timeString: string): string {
  if (!timeString) return ""
  if (timeString.includes(" ")) return timeString.split(" ")[1]
  return timeString
}

export function formatTime(timeString: string): string {
  if (!timeString) return ""
  const date = new Date(timeString)
  if (isNaN(date.getTime())) return timeString
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

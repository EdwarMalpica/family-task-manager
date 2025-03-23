export function formatDate(date: Date): string {
  // Format date as "Month Day, Year" (e.g., "March 25, 2023")
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}


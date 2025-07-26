export function formatDateToReadable(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
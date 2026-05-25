export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();

  const options: Intl.DateTimeFormatOptions =
    year === currentYear
      ? {
          month: "short",
          day: "numeric",
        }
      : {
          month: "short",
          day: "numeric",
          year: "numeric",
        };

  return date.toLocaleDateString("en-US", options);
}
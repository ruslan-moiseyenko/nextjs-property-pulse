export const dateFormat = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate; // May 27, 2024, 5:18PM
};

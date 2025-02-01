export const useFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formatted = date.toLocaleDateString("id-ID", options);
  return formatted;
};

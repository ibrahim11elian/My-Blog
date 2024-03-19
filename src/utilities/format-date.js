/**
 * @param {string} dateString - a string representing date object.
 * @returns {Date | null} The Date object in format  'mm-dd-yyyy' or null if the provided argument is not valid.
 **/
export default function formatDate(dateString) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

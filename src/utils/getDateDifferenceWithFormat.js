import { differenceInMilliseconds, format } from "date-fns";

export default function getDateDifferenceWithFormat(date1, date2) {
  // Example dates
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  // Calculate the difference in milliseconds
  const differenceMs = differenceInMilliseconds(d1, d2);
  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(differenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);
  return format(new Date(0, 0, 0, hours, minutes, seconds), "HH:mm:ss");
}

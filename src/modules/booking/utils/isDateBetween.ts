import { compareAsc } from "date-fns";

export function isDateBetween(date: Date, startDate: Date, endDate: Date) {
  return compareAsc(date, startDate) >= 0 && compareAsc(date, endDate) <= 0;
}

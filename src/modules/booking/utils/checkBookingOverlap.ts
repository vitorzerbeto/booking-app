import { format } from "date-fns";
import { Booking } from "..";
import { OverlapError } from "./OverlapError";
import { isDateBetween } from "./isDateBetween";

export function checkBookingOverlap(
  bookingList: Booking[],
  newBooking: Booking
) {
  return bookingList.some((savedBooking) => {
    const { startDate: savedStartDate, endDate: savedEndDate } = savedBooking;
    const { startDate: newStartDate, endDate: newEndDate } = newBooking;

    // if placeIds are different, no need to check for overlap
    if (newBooking.placeId !== savedBooking.placeId) {
      return false;
    }

    // if newStartDate is between savedStartDate and savedEndDate
    if (isDateBetween(newStartDate, savedStartDate, savedEndDate)) {
      const newDateFormatted = format(newStartDate, "MM/dd");

      throw new OverlapError(
        `Booking overlap! The date ${newDateFormatted} is already booked for this place`
      );
    }

    // if newEndDate is between savedStartDate and savedEndDate
    if (isDateBetween(newEndDate, savedStartDate, savedEndDate)) {
      const newDateFormatted = format(newEndDate, "MM/dd");

      throw new OverlapError(
        `Booking overlap! The date ${newDateFormatted} is already booked for this place`
      );
    }

    return false;
  });
}

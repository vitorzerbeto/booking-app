import { create } from "zustand";
import { compareAsc, format } from "date-fns";

import { Booking } from "./types";

class OverlapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OverlapError";
  }
}

type BookingStore = {
  bookingList: Booking[];
  addBooking: (booking: Booking) => void;
  editBooking: (index: number, booking: Booking) => void;
  removeBooking: (index: number) => void;
};

function isBetween(date: Date, startDate: Date, endDate: Date) {
  return compareAsc(date, startDate) >= 0 && compareAsc(date, endDate) <= 0;
}

function checkBookingOverlap(bookingList: Booking[], newBooking: Booking) {
  return bookingList.some((savedBooking) => {
    const { startDate: savedStartDate, endDate: savedEndDate } = savedBooking;
    const { startDate: newStartDate, endDate: newEndDate } = newBooking;

    // if placeIds are different, no need to check for overlap
    if (newBooking.placeId !== savedBooking.placeId) {
      return false;
    }

    // if newStartDate is between savedStartDate and savedEndDate
    if (isBetween(newStartDate, savedStartDate, savedEndDate)) {
      const newDateFormatted = format(newStartDate, "MM/dd");

      throw new OverlapError(
        `Booking overlap! The date ${newDateFormatted} is already booked for this place`
      );
    }

    // if newEndDate is between savedStartDate and savedEndDate
    if (isBetween(newEndDate, savedStartDate, savedEndDate)) {
      const newDateFormatted = format(newEndDate, "MM/dd");

      throw new OverlapError(
        `Booking overlap! The date ${newDateFormatted} is already booked for this place`
      );
    }

    return false;
  });
}

export const useBookingStore = create<BookingStore>()((set) => ({
  bookingList: [],
  addBooking: (booking) => {
    set(({ bookingList }) => {
      try {
        checkBookingOverlap(bookingList, booking);
      } catch (error) {
        if (error instanceof OverlapError) {
          console.log(error.message);
          alert(error.message);
        } else {
          console.error(error);
        }

        return { bookingList };
      }

      return { bookingList: [...bookingList, booking] };
    });
  },
  editBooking: (index, booking) => {
    set((state) => {
      const bookingList = [...state.bookingList];
      bookingList[index] = booking;
      return { bookingList };
    });
  },
  removeBooking: (index) => {
    set((state) => {
      const bookingList = [...state.bookingList];
      bookingList.splice(index, 1);
      return { bookingList };
    });
  },
}));

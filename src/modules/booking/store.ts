import { create } from "zustand";

import { Booking } from "./types";
import { checkBookingOverlap } from "./utils/checkBookingOverlap";
import { OverlapError } from "./utils/OverlapError";

type BookingStore = {
  bookingList: Booking[];
  addBooking: (booking: Booking) => void;
  editBooking: (index: number, booking: Booking) => void;
  removeBooking: (index: number) => void;
};

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
    set(({ bookingList }) => {
      try {
        checkBookingOverlap(
          bookingList.filter((_, i) => i !== index),
          booking
        );

        const newBookingList = [...bookingList];
        newBookingList[index] = booking;

        return { bookingList: newBookingList };
      } catch (error) {
        if (error instanceof OverlapError) {
          console.log(error.message);
          alert(error.message);
        } else {
          console.error(error);
        }

        return { bookingList };
      }
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

import { create } from "zustand";
import { Booking } from "./types";

type BookingStore = {
  bookingList: Booking[];
  addBooking: (booking: Booking) => void;
  editBooking: (index: number, booking: Booking) => void;
  removeBooking: (index: number) => void;
};

export const useBookingStore = create<BookingStore>()((set) => ({
  bookingList: [],
  addBooking: (booking) => {
    set((state) => ({ bookingList: [...state.bookingList, booking] }));
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

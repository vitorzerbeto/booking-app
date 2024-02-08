import { OverlapError } from "./OverlapError";
import { checkBookingOverlap } from "./checkBookingOverlap";

const bookingList = [
  {
    placeId: 1,
    startDate: new Date("2021-01-10T00:00:00.000Z"),
    endDate: new Date("2021-01-20T00:00:00.000Z"),
  },
  {
    placeId: 1,
    startDate: new Date("2021-01-21T00:00:00.000Z"),
    endDate: new Date("2021-01-30T00:00:00.000Z"),
  },
  {
    placeId: 2,
    startDate: new Date("2021-02-02T00:00:00.000Z"),
    endDate: new Date("2021-02-05T00:00:00.000Z"),
  },
];

describe("checkBookingOverlap", () => {
  it("should throw an error if there is an overlap", () => {
    const newBooking = {
      placeId: 1,
      startDate: new Date("2021-01-05T00:00:00.000Z"),
      endDate: new Date("2021-01-25T00:00:00.000Z"),
    };

    expect(() => checkBookingOverlap(bookingList, newBooking)).toThrow(
      OverlapError
    );
  });

  it("should return false if there is no overlap", () => {
    const newBooking = {
      placeId: 1,
      startDate: new Date("2021-02-02T00:00:00.000Z"),
      endDate: new Date("2021-02-05T00:00:00.000Z"),
    };

    expect(() => checkBookingOverlap(bookingList, newBooking)).not.toThrow(
      OverlapError
    );
  });
});

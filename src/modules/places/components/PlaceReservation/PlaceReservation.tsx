import * as React from "react";
import styled, { css } from "styled-components";
import DateRangePicker, {
  DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";

import { Button, Flex } from "@/modules/ui";

import { Place, ReservationDate } from "../../types";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

type DateRange = Parameters<
  Exclude<DateRangePickerProps["onChange"], undefined>
>[0];

type PlaceReservationProps = {
  place: Place;
  onClick: (reservationDate: ReservationDate) => void;
};

function isReservationValid(dates: DateRange | undefined) {
  if (!dates) {
    return;
  }

  if (!Array.isArray(dates)) {
    return false;
  }

  const [startDate, endDate] = dates;

  if (!startDate || !endDate) {
    return false;
  }

  return true;
}

export function PlaceReservation({ place, onClick }: PlaceReservationProps) {
  const [dates, setDates] = React.useState<DateRange>();

  const isValid = isReservationValid(dates);

  const handleOnChange = (dates: DateRange) => {
    setDates(dates);
  };

  const handleOnClick = () => {
    if (!isValid) {
      alert("Please select a date range correctly.");
      return;
    }

    const [startDate, endDate] = dates as [Date, Date];

    onClick([startDate, endDate]);
    setDates(undefined);
  };

  return (
    <PlaceContent>
      <h2>{place.name}</h2>
      <DateRangePicker onChange={handleOnChange} value={dates} />
      <Button disabled={!isValid} onClick={handleOnClick}>
        Reserve
      </Button>
    </PlaceContent>
  );
}

const PlaceContent = styled(Flex)(
  (props) => css`
    background-color: ${props.theme.colors.white};
    padding: ${props.theme.spacings.medium};
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `
);

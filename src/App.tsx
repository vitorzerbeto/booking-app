import styled, { css } from "styled-components";
import DateRangePicker, {
  DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";
import * as React from "react";

import { useBookingStore } from "@/modules/booking";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

type Place = {
  id: number;
  name: string;
};

const AVAILABLE_PLACES: Place[] = [
  { id: 1, name: "Paris" },
  { id: 2, name: "New York" },
  { id: 3, name: "London" },
  { id: 4, name: "Berlin" },
  { id: 5, name: "Madrid" },
];

function App() {
  const { bookingList, addBooking } = useBookingStore();

  const handleClick = (placeId: number) => (reservationDate: DateRange) => {
    if (!Array.isArray(reservationDate)) {
      alert("Please select a date range");
      return;
    }

    const [startDate, endDate] = reservationDate;

    if (!startDate || !endDate) {
      alert("Please select a date range");
      return;
    }

    addBooking({
      placeId,
      startDate,
      endDate,
    });
  };

  return (
    <AppContainer>
      <h1>Booking app</h1>

      <PlaceList>
        {AVAILABLE_PLACES.map((place) => (
          <Place key={place.id} place={place} onClick={handleClick(place.id)} />
        ))}
      </PlaceList>

      <Flex>
        {bookingList.map(({ placeId, startDate, endDate }) => (
          <Booking
            key={`${placeId} ${startDate.toISOString()} ${endDate.toISOString()}`}
          >
            <h3>{placeId}</h3>
            <p>{startDate.toISOString()}</p>
            <p>{endDate.toISOString()}</p>
          </Booking>
        ))}
      </Flex>
    </AppContainer>
  );
}

type DateRange = Parameters<
  Exclude<DateRangePickerProps["onChange"], undefined>
>[0];

type PlacesProps = {
  place: Place;
  onClick: (reservationDate: DateRange) => void;
};
function Place({ place, onClick }: PlacesProps) {
  const [dates, setDates] = React.useState<DateRange>();
  const [isValid, setIsValid] = React.useState(false);

  const handleOnChange = (dates: DateRange) => {
    setDates(dates);
  };

  const handleOnClick = () => {
    if (!dates) {
      alert("Please select a date range");
      return;
    }

    onClick(dates);
    setDates(undefined);
  };

  React.useEffect(() => {
    if (dates && Array.isArray(dates)) {
      const [startDate, endDate] = dates;

      if (startDate && endDate) {
        setIsValid(true);
      }
    } else {
      setIsValid(false);
    }
  }, [dates]);

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

const AppContainer = styled.main(
  (props) => css`
    display: flex;
    flex-direction: column;
    width: clamp(300px, 80%, 1200px);
    gap: ${props.theme.spacings.medium};
    margin: 0 auto;
  `
);

const Flex = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacings.small};
`;

const PlaceList = styled(Flex)`
  flex-direction: column;
`;

const PlaceContent = styled(Flex)(
  (props) => css`
    background-color: ${props.theme.colors.white};
    flex-direction: column;
    padding: ${props.theme.spacings.medium};
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `
);

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;
  margin: 10px 0;
`;

const Booking = styled.div`
  padding: 10px;
  border: 1px solid #f1f1f1;
  margin: 10px 0;
`;

export default App;

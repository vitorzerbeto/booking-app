import styled, { css } from "styled-components";

import { useBookingStore } from "@/modules/booking";
import { Flex } from "@/modules/ui";
import { Place, PlaceReservation, ReservationDate } from "@/modules/places";

const AVAILABLE_PLACES: Place[] = [
  { id: 1, name: "Paris" },
  { id: 2, name: "New York" },
  { id: 3, name: "London" },
  { id: 4, name: "Berlin" },
  { id: 5, name: "Madrid" },
];

function App() {
  const { bookingList, addBooking } = useBookingStore();

  const handleClick =
    (placeId: number) => (reservationDate: ReservationDate) => {
      const [startDate, endDate] = reservationDate;

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
          <PlaceReservation
            key={place.id}
            place={place}
            onClick={handleClick(place.id)}
          />
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

const AppContainer = styled.main(
  (props) => css`
    display: flex;
    flex-direction: column;
    width: clamp(300px, 80%, 1200px);
    gap: ${props.theme.spacings.medium};
    margin: 0 auto;
  `
);

const PlaceList = styled(Flex)`
  flex-direction: column;
`;

const Booking = styled.div`
  padding: 10px;
  border: 1px solid #f1f1f1;
  margin: 10px 0;
`;

export default App;

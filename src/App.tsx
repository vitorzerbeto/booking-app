import styled from "styled-components";

import { useBookingStore } from "@/modules/booking";

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

  const handleClick = (placeId: number) => () => {
    addBooking({
      placeId,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });
  };

  return (
    <div>
      <h1>Booking app</h1>

      <Flex>
        {AVAILABLE_PLACES.map((place) => (
          <Place key={place.id} place={place} onClick={handleClick(place.id)} />
        ))}
      </Flex>

      <Flex>
        {bookingList.map(({ placeId, startDate, endDate }) => (
          <Booking key={`${placeId} ${startDate} ${endDate}`}>
            <h3>{placeId}</h3>
            <p>{startDate}</p>
            <p>{endDate}</p>
          </Booking>
        ))}
      </Flex>
    </div>
  );
}

function Place({ place, onClick }: { place: Place; onClick: () => void }) {
  return (
    <Flex>
      <h2>{place.name}</h2>
      <Button onClick={onClick}>Book</Button>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacings.small};
`;

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

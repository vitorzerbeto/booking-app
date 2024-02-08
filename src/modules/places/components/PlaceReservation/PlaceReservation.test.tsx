import { render, screen } from "@/utils/testUtils";
import { PlaceReservation } from "./PlaceReservation";
import "@testing-library/jest-dom";

HTMLCanvasElement.prototype.getContext = jest.fn();

describe("PlaceReservation", () => {
  it("renders place name", () => {
    const mockPlace = { id: 1, name: "Test Place" };
    const mockOnClick = jest.fn();

    render(<PlaceReservation place={mockPlace} onClick={mockOnClick} />);

    // Check if place name is displayed
    expect(screen.getByText("Test Place")).toBeInTheDocument();
  });
});

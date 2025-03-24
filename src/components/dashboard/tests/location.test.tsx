import { render, screen } from "@testing-library/react";
import Location from "../location";
import { AppProvider } from "@/contexts/appContext";

describe("Location search input field", () => {
  test("should have correct placeholder value", () => {
    render(
      <AppProvider>
        <Location />
      </AppProvider>
    );
    const input = screen.getByRole("textbox", { name: /location/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty("placeholder", "Search for a city");
    expect(input).toHaveProperty("value", "Bengaluru");
  });
});

describe("Location search button", () => {
  test("should be enabled", () => {
    render(
      <AppProvider>
        <Location />
      </AppProvider>
    );
    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).not.toBeDisabled();
  });
});

import HourlyForecast from "../hourlyForecast";
import { render, screen } from "@testing-library/react";
import { HourlyForecasts } from "@/models/dashboard";
import { useAppContext } from "@/contexts/appContext";

jest.mock("@/contexts/appContext", () => ({
  useAppContext: jest.fn(),
}));

const hourlyWeatherData: HourlyForecasts = {
  time: ["1 pm", "2 pm", "3 pm", "4 pm", "5 pm"],
  temperature_2m: [22, 23, 24, 25, 26],
  weather_code: [0, 0, 0, 0, 0],
};

describe("HourlyForecast", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      currentCity: { name: "New York" },
      weatherUnits: {
        temperatureUnit: "°C",
        windSpeedUnit: "km/h",
        aqiUnit: "european_aqi",
      },
    });

    jest.useFakeTimers().setSystemTime(new Date("2025-03-25T08:00:00Z"));
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore the original Date implementation
  });
  it("renders loading state when data is undefined", () => {
    render(<HourlyForecast hourlyWeatherData={undefined} />);

    expect(screen.getByText(/Hourly\s*Forecast/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders the hourly forecast data correctly", () => {
    render(<HourlyForecast hourlyWeatherData={hourlyWeatherData} />);
    screen.debug();
    expect(screen.getByText(/Hourly\s*Forecast/i)).toBeInTheDocument();

    expect(screen.getByText(/NOW/i)).toBeInTheDocument();
    expect(screen.getByText(/2\s*pm/i)).toBeInTheDocument();
    expect(screen.getByText(/3\s*pm/i)).toBeInTheDocument();
    expect(screen.getByText(/4\s*pm/i)).toBeInTheDocument();
    expect(screen.getByText(/5\s*pm/i)).toBeInTheDocument();

    expect(screen.getByText(/22°C/i)).toBeInTheDocument();
    expect(screen.getByText(/23°C/i)).toBeInTheDocument();
    expect(screen.getByText(/24°C/i)).toBeInTheDocument();
    expect(screen.getByText(/25°C/i)).toBeInTheDocument();
    expect(screen.getByText(/26°C/i)).toBeInTheDocument();
  });
});

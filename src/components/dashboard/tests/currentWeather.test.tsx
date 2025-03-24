import { render, screen } from "@testing-library/react";
import CurrentWeather from "../currentWeather";
import { useAppContext } from "../../../contexts/appContext";
import { CurrentForecasts, DailyForecasts } from "@/models/dashboard";

jest.mock("../../../contexts/appContext", () => ({
  useAppContext: jest.fn(),
}));

const mockCurrentWeatherData: CurrentForecasts = {
  apparent_temperature: 25,
  temperature_2m: 22,
  relative_humidity_2m: 60,
  wind_speed_10m: 15,
  wind_direction_10m: 90,
  aqi: 45,
  time: "",
  interval: 0,
  weather_code: 0,
  rain: 0,
  is_day: 1,
};

const mockDailyWeatherData: DailyForecasts = {
  weather_code: [0],
  temperature_2m_max: [30],
  temperature_2m_min: [18],
  time: [],
  precipitation_sum: [],
};

describe("CurrentWeather Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      currentCity: { name: "New York" },
      weatherUnits: {
        temperatureUnit: "°C",
        windSpeedUnit: "km/h",
        aqiUnit: "european_aqi",
      },
    });
  });

  test("renders loading state when data is undefined", () => {
    render(
      <CurrentWeather
        currentWeatherData={undefined}
        dailyWeatherData={undefined}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders weather details correctly", () => {
    render(
      <CurrentWeather
        currentWeatherData={mockCurrentWeatherData}
        dailyWeatherData={mockDailyWeatherData}
      />
    );

    expect(screen.getByText(/Now/i)).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText(/Sunny\s*\|/i)).toBeInTheDocument();
    expect(screen.getByText(/feels like 25°c/i)).toBeInTheDocument();
    expect(screen.getByText(/high: 30°c/i)).toBeInTheDocument();
    expect(screen.getByText(/low: 18°c/i)).toBeInTheDocument();
    expect(screen.getByText(/humidity/i)).toBeInTheDocument();
    expect(screen.getByText("60%"));
    expect(screen.getByText(/wind/i)).toBeInTheDocument();
    expect(screen.getByText(/15 km\/h E/i)).toBeInTheDocument();
    expect(screen.getByText(/AQI/i)).toBeInTheDocument();
    expect(screen.getByText(/Moderate\s*\(\s*45\s*\)/i)).toBeInTheDocument();
  });
});

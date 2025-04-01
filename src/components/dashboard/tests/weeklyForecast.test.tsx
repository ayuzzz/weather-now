import { DailyForecasts } from "@/models/dashboard";
import { render, screen } from "@testing-library/react";
import WeeklyForecast from "../weeklyForecast";
import { useAppContext } from "@/contexts/appContext";
import { weatherCodeToIconMapping } from "../weatherConditionIcon";

const dailyForecasts: DailyForecasts = {
  time: [
    "Today",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  temperature_2m_max: [30, 31, 32, 33, 34, 35, 36],
  temperature_2m_min: [20, 21, 22, 23, 24, 25, 26],
  weather_code: [0, 0, 0, 0, 0, 0, 0],
  precipitation_sum: [0, 1, 2, 3, 4, 5, 6],
};

jest.mock("../../../contexts/appContext", () => ({
  useAppContext: jest.fn(),
}));

describe("WeeklyForecast", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      currentCity: { name: "New York" },
      weatherUnits: {
        temperatureUnit: "°C",
        windSpeedUnit: "km/h",
        aqiUnit: "european_aqi",
      },
    });

    jest.useFakeTimers().setSystemTime(new Date("2025-03-24T08:00:00Z"));
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore the original Date implementation
  });

  it("should render the correct number of days", () => {
    render(<WeeklyForecast dailyWeatherData={dailyForecasts} />);
    screen.debug();
    screen.getByText("Today");
    screen.getByText("Tuesday");
    screen.getByText("Wednesday");
    screen.getByText("Thursday");
    screen.getByText("Friday");
    screen.getByText("Saturday");
    screen.getByText("Sunday");
    for (let i = 0; i < 7; i++) {
      screen.getByText(
        `${
          weatherCodeToIconMapping[dailyForecasts.weather_code[i]][0]
        } | High: ${dailyForecasts.temperature_2m_max[i]}°C | Low: ${
          dailyForecasts.temperature_2m_min[i]
        }°C | ${dailyForecasts.precipitation_sum[i]}% precipitation`
      );
    }
  });
});

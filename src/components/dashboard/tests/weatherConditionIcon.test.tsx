import { render } from "@testing-library/react";
import WeatherConditionIcon from "../weatherConditionIcon";

describe("WeatherConditionIcon", () => {
  it("should render the correct icon for the given weather code", () => {
    const { container } = render(<WeatherConditionIcon code={0} />);
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});

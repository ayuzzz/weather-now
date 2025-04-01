import { AppProvider } from "@/contexts/appContext";
import Navbar from "./navbar";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Navbar", () => {
  it("renders correctly", () => {
    const { container } = render(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("render the urls correctly", () => {
    render(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );

    expect(screen.getByText("Dashboard")).toHaveAttribute("href", "/");
    expect(screen.getByText("Maps")).toHaveAttribute("href", "/maps");
    expect(screen.getByText("Settings")).toHaveAttribute("href", "/settings");
  });

  it("should have a logo", () => {
    const { container } = render(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );
    const logo = container.querySelector("img");
    expect(logo).toHaveProperty("src", expect.stringContaining("favicon.png"));
    expect(logo).toHaveProperty("alt", "Logo");
    expect(logo).toBeInTheDocument();
  });
});

describe("Theme Toggle", () => {
  it("should render the theme toggle button", () => {
    render(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );

    const button = screen.getByRole("button", { name: /theme toggle/i });
    expect(button).toBeInTheDocument();
  });

  it("should toggle the theme on click", () => {
    render(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );

    const button = screen.getByRole("button", { name: /theme toggle/i });
    const icon = button.querySelector("svg");

    let iconPath = icon?.querySelector("path");
    expect(iconPath).toHaveAttribute(
      "d",
      "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
    ); // HiMoon path data

    // Click to toggle theme
    fireEvent.click(button);

    // After clicking: Dark mode (should show sun icon)
    iconPath = button.querySelector("svg")?.querySelectorAll("path")[1];
    expect(iconPath).toHaveAttribute(
      "d",
      "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
    ); // MdLightMode path data
  });
});

import { screen, render } from "@testing-library/react";
import { WeatherWidget } from "./WeatherWidget";
import * as useWeatherWidgetFile from "./useWeatherWidget";

const useWeatherWidgetSpy = vi.spyOn(useWeatherWidgetFile, "useWeatherWidget");

const mockUseWeatherWidget = ({
  data = [],
  isLoading = false,
  isError = false,
}) => {
  useWeatherWidgetSpy.mockReturnValue({ data, isLoading, isError });
};

describe("<WeatherWidget/>", () => {
  afterAll(() => {
    useWeatherWidgetSpy.mockRestore();
  });
  test("render component with loading", () => {
    mockUseWeatherWidget({ isLoading: true });
    render(<WeatherWidget />);
    expect(screen.getByText("Loading weather data...")).toBeInTheDocument();
  });
  test("render error", () => {
    mockUseWeatherWidget({ isError: true });
    render(<WeatherWidget />);
    expect(
      screen.getByText("Failed to load weather data.")
    ).toBeInTheDocument();
  });
  test("show data", () => {
    mockUseWeatherWidget({
      data: { temperature: 20, condition: "good" },
    });
    render(<WeatherWidget />);
    expect(screen.getByText(/20/i)).toBeInTheDocument();
    expect(screen.getByText("Condition: good")).toBeInTheDocument();
  });
});

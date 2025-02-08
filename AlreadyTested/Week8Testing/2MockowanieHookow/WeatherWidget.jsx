import { useWeatherWidget } from "./useWeatherWidget";

export function WeatherWidget() {
  const { data, isLoading, isError } = useWeatherWidget();
  console.log(data, isLoading, isError);

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (isError) {
    return <div>Failed to load weather data.</div>;
  }

  if (!data) {
    return <div>No weather data available.</div>;
  }

  return (
    <div>
      <h2>Weather Forecast</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Condition: {data.condition}</p>
    </div>
  );
}

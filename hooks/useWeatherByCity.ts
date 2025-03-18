import { useState, useEffect } from "react";

export function useWeatherByCity(city: string) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=49cc448cd1bd4e5d87c52723251103&q=${city}&days=3&lang=pt&alerts=yes`
        );

        // 🔥 Verifica se a resposta não é JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Erro na resposta da API. Verifique a chave da API.");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        setWeather({
          city: data.location.name,
          temperature: data.current.temp_c,
          description: data.current.condition.text,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
          icon: data.current.condition.icon,
          forecast: Array.isArray(data.forecast?.forecastday)
            ? data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                temp: day.day.avgtemp_c,
                description: day.day.condition.text,
                icon: day.day.condition.icon,
              }))
            : [], // 🔥 Garantindo que `forecast` sempre seja um array
          alerts: data.alerts?.alert || [],
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}
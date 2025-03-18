import { useState, useEffect } from "react";

export function useWeather(lat?: number, lon?: number) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=49cc448cd1bd4e5d87c52723251103&q=${lat},${lon}&days=3&lang=pt&alerts=yes`
        );

        console.log("🔍 Resposta bruta da API:", response);

        // 🔥 Verificar se a resposta não é JSON antes de tentar parseá-la
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("❌ Resposta da API não é um JSON. Verifique sua chave da API.");
        }

        const data = await response.json();
        console.log("✅ JSON recebido:", data);

        if (data.error) {
          throw new Error(data.error.message);
        }

        setWeather({
          city: data.location.name,
          temperature: data.current?.temp_c ?? 0,
          description: data.current?.condition?.text ?? "Sem descrição",
          wind_kph: data.current?.wind_kph ?? 0,
          humidity: data.current?.humidity ?? 0,
          icon: data.current?.condition?.icon ? `https:${data.current.condition.icon}` : "",
          forecast: Array.isArray(data.forecast?.forecastday)
            ? data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                temp: day.day?.avgtemp_c ?? 0,
                description: day.day?.condition?.text ?? "Sem descrição",
                icon: day.day?.condition?.icon ? `https:${day.day.condition.icon}` : "",
              }))
            : [],
          alerts: data.alerts?.alert || [],
        });
      } catch (err: any) {
        console.error("🚨 Erro ao buscar clima:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
}
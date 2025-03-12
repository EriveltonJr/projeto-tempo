import { useState, useEffect } from "react";
import { API_KEY } from "@env";
import { WeatherData } from "@/hooks/useWeather"; // Importe corretamente o tipo WeatherData

export function useWeatherByCity(city: string) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setWeather(null);

      try {
        // Chama a API com a cidade
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
        console.log("Buscando dados para a cidade:", apiUrl); // Verificando a URL gerada

        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("Resposta da API:", data); // Verificando a resposta da API

        if (data.error) {
          setError("Cidade não encontrada");
          setWeather(null);
        } else {
          // Garantindo que os dados estejam no formato correto
          const formattedWeather: WeatherData = {
            location: {
              name: data.location.name,
              country: data.location.country,
              region: data.location.region,
              lat: data.location.lat,
              lon: data.location.lon,
              localtime: data.location.localtime,
              timezone: data.location.tz_id,
            },
            current: {
              temp_c: data.current.temp_c,
              wind_kph: data.current.wind_kph,
              humidity: data.current.humidity,
              condition: {
                text: data.current.condition.text,
                icon: data.current.condition.icon,
              },
            },
          };

          setWeather(formattedWeather);
        }
      } catch (err) {
        setError("Erro ao buscar dados");
        setWeather(null);
      }

      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}
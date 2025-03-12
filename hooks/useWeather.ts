import { useState, useEffect } from "react";
import { API_KEY } from "@env";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
    localtime: string;
    timezone: string;
  };
  current: {
    temp_c: number;
    wind_kph: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

const BASE_URL = "https://api.weatherapi.com/v1";

export function useWeather(lat?: number, lon?: number) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) {
      setError("Coordenadas inválidas");
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`🌍 Buscando clima para: ${lat}, ${lon}`);

        const response = await fetch(
          `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
        );

        const data = await response.json();

        console.log("🔍 Resposta da API:", data);

        if (data.error) {
          setError(`Erro da API: ${data.error.message}`);
          setWeather(null);
        } else {
          // ✅ Convertendo os dados para o formato correto
          const formattedWeather: WeatherData = {
            location: {
              name: data.location.name,
              country: data.location.country,
              region: "",
              lat: 0,
              lon: 0,
              localtime: "",
              timezone: ""
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
        console.error("🚨 Erro ao buscar previsão:", err);
        setError("Erro ao conectar com a API");
        setWeather(null);
      }

      setLoading(false);
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
}
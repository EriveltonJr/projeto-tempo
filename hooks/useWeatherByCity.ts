import { useState, useEffect } from "react";
import { API_KEY } from "@env"; 
export function useWeatherByCity(city: string) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city || city.trim().length === 0) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      const formattedCity = city.trim();

      try {
        console.log(`🔍 Buscando clima para: ${formattedCity}`); 

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(formattedCity)}&lang=pt`
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro na API:", errorData);
          throw new Error(errorData.error?.message || "Erro ao buscar clima. Cidade não encontrada.");
        }

        const data = await response.json();
        console.log("✅ Dados do clima recebidos:", data); 

        setWeather({
          city: data.location.name,
          temperature: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon, 
        });
      } catch (err: any) {
        setError(err.message || "Erro desconhecido ao buscar clima.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
}
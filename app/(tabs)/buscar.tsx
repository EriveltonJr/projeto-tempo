import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { BuscarBar } from "@/components/BuscarBar";
import { WeatherCard } from "@/components/WeatherCard";
import { useWeatherByCity } from "@/hooks/useWeatherByCity";
import { ErrorMessage } from "@/components/ErrorMessage";
import { WeatherData } from "@/hooks/useWeather";

export default function BuscarScreen() {
  const [city, setCity] = useState("");
  const { weather, loading, error } = useWeatherByCity(city);

  // Garantir que a requisição só seja feita se a cidade for válida
  useEffect(() => {
    if (city.length > 0) {
      // Aqui pode-se adicionar lógica de debounce ou otimização, para evitar chamadas excessivas à API
    }
  }, [city]);

  return (
    <View style={styles.container}>
      <BuscarBar value={city} onChangeText={setCity} placeholder="Buscar por cidade..." />

      {loading && <ActivityIndicator size="large" color="#FFF" />}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        // Apenas renderiza o WeatherCard se `weather` estiver presente
        weather && <WeatherCard weather={weather} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13141a",
    padding: 20,
  },
});
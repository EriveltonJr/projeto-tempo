import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useWeatherByCity } from "@/hooks/useWeatherByCity"; // Certifique-se de que o hook está sendo importado corretamente
import { WeatherCard } from "@/components/WeatherCard";
import { ErrorMessage } from "@/components/ErrorMessage";

// Exemplo de cidades favoritas
const favoriteCities = ["São Paulo", "Rio de Janeiro", "Curitiba"];

export default function FavoritosScreen() {
  // Armazenar os dados do clima de todas as cidades
  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    // Função para buscar o clima de todas as cidades favoritas
    const fetchWeatherForCities = async () => {
      try {
        const weatherResults = await Promise.all(
          favoriteCities.map(async (city) => {
            const { weather, loading, error } = await useWeatherByCity(city);
            return { city, weather, loading, error };
          })
        );
        setWeatherData(weatherResults);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      }
    };

    fetchWeatherForCities();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.city}
        renderItem={({ item }) => {
          if (item.loading) return <ActivityIndicator size="large" color="#FFF" />;
          if (item.error) return <ErrorMessage message={item.error} />;

          return item.weather ? <WeatherCard weather={item.weather} /> : null;
        }}
      />
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
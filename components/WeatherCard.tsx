import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export function WeatherCard({ weather }: { weather: any }) {
  if (!weather || !weather.temperature) {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>⚠️ Não foi possível carregar os dados do tempo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.city}</Text>
      <Image source={{ uri: weather.icon }} style={styles.icon} />
      <Text style={styles.temp}>{weather.temperature}°C</Text>
      <Text style={styles.condition}>{weather.description}</Text>

      {weather.forecast && Array.isArray(weather.forecast) && weather.forecast.length > 0 ? (
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>Previsão para os próximos dias:</Text>
          {weather.forecast.map((day: any, index: number) => (
            <View key={index} style={styles.forecastItem}>
              <Text>{day.date}</Text>
              <Image source={{ uri: day.icon }} style={styles.iconSmall} />
              <Text>{day.temp}°C - {day.description}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noForecast}>🔴 Dados de previsão indisponíveis</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f7fa",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10, 
    width: "100%", 
  },
  city: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  temp: { fontSize: 45, fontWeight: "bold", color: "#333" },
  condition: { fontSize: 18, color: "#555", marginBottom: 10 },
  icon: { width: 80, height: 80, marginVertical: 10 },
  iconSmall: { width: 50, height: 50, marginTop: 5 },
  forecastContainer: { marginTop: 15, alignItems: "center" },
  forecastTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  forecastItem: { marginBottom: 10, alignItems: "center" },
  noForecast: { fontSize: 14, color: "red", textAlign: "center", marginTop: 10 },
  error: { color: "red", textAlign: "center" },
});
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export interface WeatherData {
  id?: string;
  city: string;
  temperature: number;
  description: string;
  wind_kph: number;
  humidity: number;
  icon: string;
}

export function WeatherCard({ weather }: { weather: WeatherData }) {
  if (!weather) {
    return <Text style={styles.error}>❌ Dados meteorológicos não disponíveis</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.city}</Text>
      <Image source={{ uri: `https:${weather.icon}` }} style={styles.icon} />
      <Text style={styles.temp}>{weather.temperature}°C</Text>
      <Text style={styles.condition}>{weather.description}</Text>
      <View style={styles.details}>
        <Text>💨 {weather.wind_kph} km/h</Text>
        <Text>💧 {weather.humidity}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ffffff",
  },
  temp: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#ffffff",
  },
  condition: {
    fontSize: 18,
    color: "#60a5fa",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

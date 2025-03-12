import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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

export function WeatherCard({ weather }: { weather: WeatherData }) {
  if (!weather || !weather.current || !weather.location) {
    return <Text style={styles.error}>❌ Dados meteorológicos não disponíveis</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.city}>
        {weather.location.name}, {weather.location.country}
      </Text>
      <Text style={styles.temp}>🌡️ Temperatura: {weather.current.temp_c}°C</Text>
      <Text>💨 Vento: {weather.current.wind_kph} km/h</Text>
      <Text>💧 Umidade: {weather.current.humidity}%</Text>
      <Text>📌 Condição: {weather.current.condition.text}</Text>
      <Image
        source={{ uri: `https:${weather.current.condition.icon}` }}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  temp: {
    fontSize: 18,
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
});
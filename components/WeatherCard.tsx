import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
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
  const [isFavorite, setIsFavorite] = useState(false);

  if (!weather || !weather.current || !weather.location) {
    return <Text style={styles.error}>❌ Dados meteorológicos não disponíveis</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.location.name}, {weather.location.country}</Text>
      <Image source={{ uri: weather.current.condition.icon }} style={styles.icon} />
      <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
      <Text style={styles.condition}>{weather.current.condition.text}</Text>
      <View style={styles.details}>
        <Text>💨 {weather.current.wind_kph} km/h</Text>
        <Text>💧 {weather.current.humidity}%</Text>
      </View>
      
      <TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFavorite(!isFavorite)}>
        <Text style={styles.favoriteText}>{isFavorite ? "★ Remover dos Favoritos" : "☆ Adicionar aos Favoritos"}</Text>
      </TouchableOpacity>
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
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  temp: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#333",
  },
  condition: {
    fontSize: 18,
    color: "#555",
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
  favoriteButton: {
    marginTop: 15,
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
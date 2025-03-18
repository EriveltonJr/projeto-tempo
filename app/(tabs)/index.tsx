import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Button } from "react-native";
import * as Location from "expo-location";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCard } from "@/components/WeatherCard";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function HomeScreen() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLocation() {
      setLoading(true);
      let position = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      setLoading(false);
    }
    fetchLocation();
  }, []);

  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    location?.lat,
    location?.lon
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      {weather && <WeatherCard weather={weather} />}
      <Button title="Atualizar Localização" onPress={() => location} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaaaaa",
    marginTop: 20,
  },
  errorContainer: {
    alignItems: "center",
  },
});
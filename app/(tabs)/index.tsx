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

  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada.");
        setLoading(false);
        return;
      }

      let position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (!position || !position.coords) {
        throw new Error("Não foi possível obter as coordenadas.");
      }

      console.log("📍 Localização obtida:", position.coords.latitude, position.coords.longitude);
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    } catch (error: any) {
      setErrorMsg(error.message || "Erro desconhecido ao acessar a localização.");
      console.error("🚨 Erro na localização:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, []);

  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    location?.lat,
    location?.lon
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>

      {errorMsg ? (
        <View style={styles.errorContainer}>
          <ErrorMessage message={errorMsg} />
          <Button title="Tentar Novamente" onPress={fetchLocation} />
        </View>
      ) : (
        <>
          {loading || weatherLoading ? (
            <ActivityIndicator size="large" color="#60a5fa" />
          ) : weather ? (
            <WeatherCard
              weather={{
                city: weather.location.name,
                temperature: weather.current.temp_c,
                description: weather.current.condition.text,
                wind_kph: weather.current.wind_kph,
                humidity: weather.current.humidity,
                icon: weather.current.condition.icon,
              }}
            />
          ) : (
            <Text style={styles.infoText}>Não há dados meteorológicos disponíveis</Text>
          )}

          <Button title="Atualizar Localização" onPress={fetchLocation} color="#60a5fa" />
        </>
      )}
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
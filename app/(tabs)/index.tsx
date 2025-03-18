import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Button } from "react-native";
import * as Location from "expo-location";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCard } from "@/components/WeatherCard";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function HomeScreen() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🚀 Função para buscar a localização
  const fetchLocation = async () => {
    try {
      setLoading(true);
      let position = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    } catch (error) {
      setErrorMsg("Erro ao obter localização.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation(); // 🔥 Obtém a localização quando a tela carrega
  }, []);

  // 🚀 Obtém os dados meteorológicos
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    location?.lat,
    location?.lon
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>

      {loading || weatherLoading ? (
        <ActivityIndicator size="large" color="#60a5fa" />
      ) : weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <Text style={styles.infoText}>Não há dados meteorológicos disponíveis.</Text>
      )}

      {/* 🔥 Agora o botão atualiza corretamente a localização */}
      <Button title="Atualizar Localização" onPress={fetchLocation} color="#3498db" />
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
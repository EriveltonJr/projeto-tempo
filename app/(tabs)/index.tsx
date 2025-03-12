import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import * as Location from "expo-location";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCard } from "@/components/WeatherCard";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function WeatherScreen() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 🚀 Função para obter a localização do usuário
  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      // 🟢 Solicitar permissão para acessar a localização
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada.");
        setLoading(false);
        return;
      }

      // 🌍 Obter coordenadas do usuário
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

  // Executa automaticamente ao carregar a tela
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // Obtém os dados meteorológicos somente após a localização ser definida
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    location?.lat,
    location?.lon
  );

  // Se houver erro de permissão ou localização, exibe mensagem e botão para tentar novamente
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <ErrorMessage message={errorMsg} />
        <Button title="Tentar Novamente" onPress={fetchLocation} />
      </View>
    );
  }

  // Se ainda estiver carregando a localização, exibe loading
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Obtendo localização...</Text>
        <ActivityIndicator size="large" color="#60a5fa" />
      </View>
    );
  }

  // Se ainda estiver carregando os dados meteorológicos, exibe loading
  if (weatherLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#60a5fa" />
      </View>
    );
  }

  // Se houver erro ao buscar o clima, exibe mensagem e botão para tentar novamente
  if (weatherError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message={weatherError} />
        <Button title="Tentar Novamente" onPress={fetchLocation} />
      </View>
    );
  }

  // Exibe os dados meteorológicos
  return (
    <View style={styles.container}>
      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <Text style={styles.text}>Não há dados meteorológicos disponíveis</Text>
      )}
      <Button title="Atualizar Localização" onPress={fetchLocation} />
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
  text: {
    color: "#f8fafc", 
    fontSize: 18,
    fontWeight: "bold", 
    textAlign: "center",
    marginBottom: 10, 
    textShadowColor: "rgba(0, 0, 0, 0.5)", 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: "#1e293b", 
    padding: 20,
    borderRadius: 12, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, 
    marginTop: 15,
  },
  button: {
    backgroundColor: "#60a5fa", 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Button, Text } from "react-native";
import { useFavoritos } from "@/hooks/useFavoritos";
import { WeatherCard } from "@/components/WeatherCard";

export default function FavoritosScreen() {
  const { favoritos, removeFavorito, loadFavoritos } = useFavoritos();

  useEffect(() => {
    loadFavoritos(); 
  }, [favoritos]);  

  const handleRemoveFavorite = async (city: string) => {
    await removeFavorito(city);
    await loadFavoritos(); // 🔥 Atualiza a UI após remover
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cidades Favoritas</Text>
      {favoritos.length === 0 ? (
        <Text style={styles.infoText}>Nenhuma cidade favoritada ainda.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.city}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <WeatherCard
                weather={{
                  city: item.city,
                  temperature: item.temperature,
                  description: item.description,
                  wind_kph: item.wind_kph ?? 0, 
                  humidity: item.humidity ?? 0,
                  icon: item.icon.startsWith("http") ? item.icon : `https:${item.icon}`,
                }}
              />
              <Button title="Remover" onPress={() => handleRemoveFavorite(item.city)} color="#e74c3c"/>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#1E1E1E" }, 
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#ffffff" },
  infoText: { textAlign: "center", fontSize: 16, color: "#aaaaaa", marginTop: 20 },
  itemContainer: { 
    marginBottom: 20, 
    alignItems: "center",
    padding: 10,
    backgroundColor: "#222831", 
    borderRadius: 10,
  },
});
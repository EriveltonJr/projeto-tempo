import { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Button, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { BuscarBar } from "@/components/BuscarBar";
import { WeatherCard } from "@/components/WeatherCard";
import { useWeatherByCity } from "@/hooks/useWeatherByCity";
import { useFavoritos } from "@/hooks/useFavoritos";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function BuscarScreen() {
  const [city, setCity] = useState<string>("");
  const { weather, loading, error } = useWeatherByCity(city);
  const { favoritos, addFavorito } = useFavoritos();

  const handleAddToFavorites = () => {
    if (!weather) return;

    if (favoritos.some((fav) => fav.city === weather.city)) {
      Alert.alert("Atenção", "Essa cidade já está nos favoritos!");
    } else {
      addFavorito({
        city: weather.city,
        temperature: weather.temperature,
        description: weather.description,
        wind_kph: weather.wind_kph,
        humidity: weather.humidity,
        icon: weather.icon,
      });
      Alert.alert("Sucesso", "Cidade adicionada aos favoritos!");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <BuscarBar city={city} setCity={setCity} />
        {loading && <ActivityIndicator size="large" color="#ffffff" />}
        {error ? (
          <ErrorMessage message={error} /> // 🔥 Agora exibe erro amigável
        ) : (
          weather && (
            <>
              <WeatherCard weather={weather} />
              <Button title="Adicionar aos Favoritos" onPress={handleAddToFavorites} color="#3498db" />
            </>
          )
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
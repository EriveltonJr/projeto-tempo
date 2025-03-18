import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { WeatherData } from "@/components/WeatherCard";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<WeatherData[]>([]);

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    try {
      const storedFavoritos = await AsyncStorage.getItem("favoritos");
      if (storedFavoritos) {
        setFavoritos(JSON.parse(storedFavoritos));
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  };

  const addFavorito = async (weather: WeatherData) => {
    try {
      const storedFavoritos = await AsyncStorage.getItem("favoritos");
      let favoritosAtuais = storedFavoritos ? JSON.parse(storedFavoritos) : [];

      if (favoritosAtuais.some((fav: WeatherData) => fav.city === weather.city)) {
        return; 
      }

      const updatedFavoritos = [...favoritosAtuais, weather];
      await AsyncStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));

      setFavoritos(updatedFavoritos);
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  const removeFavorito = async (city: string) => {
    try {
      const storedFavoritos = await AsyncStorage.getItem("favoritos");
      let favoritosAtuais = storedFavoritos ? JSON.parse(storedFavoritos) : [];

      const updatedFavoritos = favoritosAtuais.filter((item: WeatherData) => item.city !== city);
      await AsyncStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));

      // 🔥 Atualiza o estado imediatamente após a remoção
      setFavoritos(updatedFavoritos);
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return { favoritos, addFavorito, removeFavorito, loadFavoritos };
}
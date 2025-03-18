import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

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

  const addFavorito = async (weather: any) => {
    try {
      const storedFavoritos = await AsyncStorage.getItem("favoritos");
      let favoritosAtuais = storedFavoritos ? JSON.parse(storedFavoritos) : [];

      if (favoritosAtuais.some((fav: any) => fav.city.toLowerCase() === weather.city.toLowerCase())) {
        console.log("⚠️ Cidade já está nos favoritos:", weather.city);
        return;
      }

      const updatedFavoritos = [...favoritosAtuais, weather];
      await AsyncStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));

      setFavoritos(updatedFavoritos);
      console.log("✅ Cidade adicionada aos favoritos:", weather.city);

      loadFavoritos();
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  const removeFavorito = async (city: string) => {
    try {
      const storedFavoritos = await AsyncStorage.getItem("favoritos");
      let favoritosAtuais = storedFavoritos ? JSON.parse(storedFavoritos) : [];

      const updatedFavoritos = favoritosAtuais.filter((item: any) => item.city.toLowerCase() !== city.toLowerCase());
      await AsyncStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));

      setFavoritos(updatedFavoritos);
      console.log("🚀 Cidade removida:", city);

      loadFavoritos();
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return { favoritos, addFavorito, removeFavorito, loadFavoritos };
}
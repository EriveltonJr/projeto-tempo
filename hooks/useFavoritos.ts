import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Weather } from '@/types';

const FavoritoS_KEY = 'Favoritos';

export function useFavoritos() {
  const [Favoritos, setFavoritos] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    try {
      const FavoritosJson = await AsyncStorage.getItem(FavoritoS_KEY);
      if (FavoritosJson) {
        setFavoritos(JSON.parse(FavoritosJson));
      }
    } catch (err) {
      setError('Failed to load Favoritos');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorito = async (weather: Weather) => {
    try {
      const newFavoritos = isFavorito(weather.id)
        ? Favoritos.filter((f) => f.id !== weather.id)
        : [...Favoritos, weather];
      
      await AsyncStorage.setItem(FavoritoS_KEY, JSON.stringify(newFavoritos));
      setFavoritos(newFavoritos);
    } catch (err) {
      setError('Failed to update Favoritos');
    }
  };

  const isFavorito = (id: number) => {
    return Favoritos.some((f) => f.id === id);
  };

  return { Favoritos, loading, error, toggleFavorito, isFavorito };
}
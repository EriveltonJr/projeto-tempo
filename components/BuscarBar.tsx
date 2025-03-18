import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

interface BuscarBarProps {
  city: string;
  setCity: (text: string) => void; 
}

export function BuscarBar({ city, setCity }: BuscarBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={(text) => setCity(text)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 },
});
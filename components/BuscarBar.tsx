import { TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native";

interface BuscarBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function BuscarBar({ value, onChangeText, placeholder }: BuscarBarProps) {
  return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#71717a"
          returnKeyType="done" 
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", 
  },
  input: {
    backgroundColor: "#1a1b1e",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
  },
});
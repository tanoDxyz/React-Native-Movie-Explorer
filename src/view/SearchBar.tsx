import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { SearchIcon } from "@hugeicons/core-free-icons";

type SearchBarProps = {
  value?: string;
  onTextChange: (text: string) => void;
};

export function SearchBar({ value, onTextChange }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <HugeiconsIcon
        icon={SearchIcon}
        size={20}
        color="#999"
        style={styles.icon}
      />

      <TextInput
        value={value}
        placeholder="Search movies..."
        placeholderTextColor="#999"
        style={styles.input}
        returnKeyType="search"
        onChangeText={onTextChange}   // 👈 listener
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing" // iOS
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
});

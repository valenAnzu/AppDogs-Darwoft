import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  actualValue: string;
  onFilterChange: (value: string) => void;
}

const HeaderFilter: React.FC<Props> = ({ actualValue, onFilterChange }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#555" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder="Buscar raza..."
        value={actualValue}
        onChangeText={onFilterChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default HeaderFilter;

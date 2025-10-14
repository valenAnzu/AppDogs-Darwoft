import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  actualValue: string;
  onFilterChange: (value: string) => void;
}

const HeaderFilter: React.FC<Props> = ({ actualValue, onFilterChange }) => {
  const [ isSearchVisible, setIsSearchVisible ] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(false);
  const widthAnim = useRef(new Animated.Value(50)).current; //ancho inicial de solo el icono

  const expand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsSearchVisible(true);
      Animated.timing(widthAnim, {
        toValue: 200, // ancho final del buscador
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  const collapse = () => {
    Animated.timing(widthAnim, {
      toValue: 50,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setIsExpanded(false);
      onFilterChange(""); // limpiamos el texto
    });
  };

  const handleClear = () => {
    onFilterChange("");
  };

  return (
    <Animated.View style={[styles.container, {width: widthAnim}]}>
      {!isExpanded ? (
        <Pressable onPress={expand}>
        <Icon name="search-outline" size={22} color="#555"  />
      </Pressable>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Buscar raza..."
          placeholderTextColor="#888"
          value={actualValue}
          onChangeText={onFilterChange}
          onBlur={() => {
            if (actualValue.trim() === "") collapse();
          }}
        />
      )}

      {isSearchVisible && actualValue.length > 0 && (
        <Pressable onPress={handleClear}>
          <Icon name="backspace-outline" size={22} color="#555" style={{ marginLeft: 8 }} />
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#c4faff",
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 45,
    width: '90%',
    alignSelf: "center",
    marginVertical: 10,
    //sombra ios
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    //sombra android
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#333',
  },
});

export default HeaderFilter;

import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Animated, Modal, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  actualValue: string;
  onFilterChange: (value: string) => void;
}

const HeaderFilter: React.FC<Props> = ({ actualValue, onFilterChange }) => {
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <>
      {/* Icono de búsqueda en el header */}
      <Pressable onPress={() => setModalVisible(true)}>
        <Icon name="search-outline" size={28} color="black" />
      </Pressable>

      {/* Modal de búsqueda */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Buscar raza..."
              value={actualValue}
              onChangeText={onFilterChange}
              autoFocus
            />
            {actualValue.length > 0 && (
              <Pressable onPress={() => onFilterChange("")}>
                <Icon name="backspace-outline" size={24} color="#555" style={{ marginLeft: 8 }} />
              </Pressable>
            )}
            <Pressable onPress={() => setModalVisible(false)} style={{ marginLeft: 10 }}>
              <Text style={{ color: "#555" }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c4faff',
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 50,
    width: '90%',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#333',
  },
});
  {/*return (
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

      {isExpanded && actualValue.length > 0 && (
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
*/}

export default HeaderFilter;

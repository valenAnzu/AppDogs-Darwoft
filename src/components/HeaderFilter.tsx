import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Modal, Text } from "react-native";
import Ionicons from "./icons/Ionicons";

interface Props {
  actualValue: string;
  onFilterChange: (value: string) => void;
}

const HeaderFilter: React.FC<Props> = ({ actualValue, onFilterChange }) => {
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="search-outline" size={28} color="black" />
        </Pressable>
      </View>

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
                <Ionicons name="backspace-outline" size={24} color="#555" style={{ marginLeft: 8 }} />
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

export default HeaderFilter;

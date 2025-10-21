import React, { useState } from "react";
import { View, StyleSheet, Pressable} from "react-native";
import Ionicons from "../utils/Ionicons";
import ModalView from "./ModalView";

interface Props {
  actualValue: string;
  onFilterChange: (value: string) => void;
}

const HeaderFilter: React.FC<Props> = ({ actualValue, onFilterChange }) => {
  const [ modalVisible, setModalVisible ] = useState(false);

  return (
    <>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="search-outline" size={28} color="black" />
        </Pressable>
      </View>

      {/* Modal de búsqueda */}
      <ModalView
        modalVisible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
        actualValue={actualValue}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});

export default HeaderFilter;

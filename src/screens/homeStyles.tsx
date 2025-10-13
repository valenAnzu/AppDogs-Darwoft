import { StyleSheet } from "react-native";

    { /* TODO: Crea estilos para los nombres de los perros, usa algun color diferente al negro y reutilizalo en ambas apntallas */}
export const homeStyles = StyleSheet.create({
  screenContent: {
    padding: 10
  },
  textName: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 8,
    },
    subtitle: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    textInfo: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'normal',
      color: '#555',
    },

});
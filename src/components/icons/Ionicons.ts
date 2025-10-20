import { Platform } from "react-native";

let IoniconsComponent: any;

if (Platform.OS === "ios") {
  // Scoped package

  IoniconsComponent = require("@react-native-vector-icons/ionicons").default;
} else {
  // Android: keep using monolithic package to leverage fonts.gradle font copying

  IoniconsComponent = require("react-native-vector-icons/Ionicons").default;
}

export default IoniconsComponent;

// TODO: Mover todo este archivo a una carpeta dentro de src/utils
// Esto no representa un icono particular, por lo q no podemos ponerlo aca.
// Es más una herramienta de "utilidad" que permite gestionar los iconos de la librería Ionicons.

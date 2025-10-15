import { Platform } from "react-native";

// Use scoped package on iOS (matches installed Pod), legacy monolithic on Android (works with fonts.gradle)
// Typing as any to avoid cross-package type incompatibilities
// Consumers can use it like the default Ionicons component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let IoniconsComponent: any;

if (Platform.OS === "ios") {
  // Scoped package
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  IoniconsComponent = require("@react-native-vector-icons/ionicons").default;
} else {
  // Android: keep using monolithic package to leverage fonts.gradle font copying
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  IoniconsComponent = require("react-native-vector-icons/Ionicons").default;
}

export default IoniconsComponent;



import { Slot } from "expo-router";
import "react-native-reanimated";
import "./global.css";
import { AuthProvider } from "@/core/context/UseAuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />;
    </AuthProvider>
  );
}

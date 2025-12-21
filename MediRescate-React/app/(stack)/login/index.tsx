import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
      <Pressable onPress={() => router.replace("/operario")}>Login</Pressable>
    </View>
  );
};

export default LoginScreen;

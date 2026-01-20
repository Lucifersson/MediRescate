import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const {
    username,
    password,
    errorCamposVacios,
    errorUsuario,
    setUsernameValue,
    setPasswordValue,
    onLoginPress,
  } = useAuth();

  return (
<SafeAreaView className="flex-1 bg-white px-6">
  <KeyboardAvoidingView
    className="flex-1"
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 justify-center">
        {/* LOGO */}
        <View className="items-center ">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            style={style.image}
            resizeMode="contain"
          />
        </View>

        {/* FORM */}
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          {/* USER */}
          <View className="mb-4">
            <Text className="mb-2 text-base font-semibold text-gray-700">
              Usuario o email
              {errorCamposVacios && (
                <Text className="text-red-500"> *</Text>
              )}
            </Text>
            <TextInput
              value={username}
              onChangeText={setUsernameValue}
              placeholder="tucorreo@ejemplo.com"
              autoCapitalize="characters"
              keyboardType="email-address"
              className="border border-gray-300 rounded-2xl px-4 py-3 text-base bg-gray-50"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* PASSWORD */}
          <View className="mb-4">
            <Text className="mb-2 text-base font-semibold text-gray-700">
              Contraseña
              {errorCamposVacios && (
                <Text className="text-red-500"> *</Text>
              )}
            </Text>
            <TextInput
              value={password}
              onChangeText={setPasswordValue}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              className="border border-gray-300 rounded-2xl px-4 py-3 text-base bg-gray-50"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* ERRORS */}
          {errorCamposVacios && (
            <Text className="mb-2 text-sm text-red-500 text-center">
              {errorCamposVacios}
            </Text>
          )}

          {errorUsuario && (
            <Text className="mb-2 text-sm text-red-500 text-center">
              {errorUsuario}
            </Text>
          )}

          {/* BUTTON */}
          <Pressable
            className="mt-4 bg-red-500 rounded-2xl py-4 shadow-md active:opacity-80"
            onPress={onLoginPress}
            onLongPress={() => router.replace("/operario")}
          >
            <Text className="text-lg font-semibold text-white text-center">
              Entrar
            </Text>
          </Pressable>
          
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
  );
};
const style = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
});

export default LoginScreen;

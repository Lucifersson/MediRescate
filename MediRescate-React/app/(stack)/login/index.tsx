/**
 * PANTALLA: LoginScreen
 * Propósito: Punto de entrada principal a la aplicación para todos los roles.
 * Funcionalidad:
 * 1. Captura de credenciales (Usuario/Email y Contraseña).
 * 2. Validación de campos vacíos y errores de autenticación.
 * 3. Soporte para evitar solapamiento del teclado mediante KeyboardAvoidingView.
 * 4. Acceso rápido (Backdoor) para desarrollo mediante onLongPress en el botón.
 */

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
  // --- LÓGICA DE NEGOCIO (HOOK) ---
  /**
   * useAuth: Centraliza la lógica de autenticación.
   * @returns {username, password} Estados controlados de los inputs.
   * @returns {errorCamposVacios, errorUsuario} Strings de error para feedback visual.
   * @returns {setUsernameValue, setPasswordValue} Funciones setter para los campos.
   * @returns {onLoginPress} Función que dispara la validación y el login.
   */
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
      {/* KeyboardAvoidingView: Ajusta la posición de la pantalla cuando el teclado está activo.
         Se comporta de forma diferente según la plataforma para un resultado óptimo.
      */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled" // Permite pulsar el botón de entrar aun con teclado abierto
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center">
            {/* --- SECCIÓN: LOGOTIPO --- */}
            <View className="items-center ">
              <Image
                source={require("@/assets/images/logo_MediRescate.png")}
                style={style.image}
                resizeMode="contain"
              />
            </View>

            {/* --- SECCIÓN: FORMULARIO DE ACCESO --- */}
            {/* Contenedor con estilo de tarjeta con sombra pronunciada (border-r/b-8) */}
            <View className="bg-white rounded-3xl p-6 border-r-8 border-b-8 border-gray-300">
              {/* CAMPO: USUARIO */}
              <View className="mb-4">
                <Text className="mb-2 text-base font-semibold text-gray-700">
                  Usuario o email
                  {/* Muestra un asterisco rojo si hay error de validación */}
                  {errorCamposVacios && (
                    <Text className="text-red-500"> *</Text>
                  )}
                </Text>
                <TextInput
                  value={username}
                  onChangeText={setUsernameValue}
                  placeholder="tucorreo@ejemplo.com"
                  autoCapitalize="characters" // Configurado para forzar mayúsculas según requerimiento de sistema
                  keyboardType="email-address"
                  className="border border-gray-300 rounded-2xl px-4 py-3 text-base bg-gray-50"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* CAMPO: CONTRASEÑA */}
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
                  secureTextEntry // Oculta los caracteres escritos
                  autoCapitalize="none"
                  className="border border-gray-300 rounded-2xl px-4 py-3 text-base bg-gray-50"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* --- BLOQUE DE ERRORES --- */}
              {/* Feedback visual dinámico basado en las validaciones del hook useAuth */}
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

              {/* --- BOTÓN DE ENTRADA --- */}
              <Pressable
                className="mt-4 bg-red-500 rounded-2xl py-4 shadow-md active:opacity-80"
                onPress={onLoginPress}
                /**
                 * WARNING: Acceso directo de emergencia/desarrollo.
                 * Salta la autenticación y entra directamente a la vista de operario.
                 */
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

// Estilos locales específicos para dimensiones de imagen
const style = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
});

export default LoginScreen;

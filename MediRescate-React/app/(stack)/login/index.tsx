import { useAuth } from "@/hooks/useAuth";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const LoginScreen = () => {

  const { username, password, error, setUsernameValue, setPasswordValue, onLoginPress } = useAuth();


  return (
        <SafeAreaView className="flex-1 ml-10 mr-10">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 mx-2" >
                        <View className="flex-1 justify-center px-1">
                            <Text className="text-3xl mb-2 text-center text-gray-900">
                                MediRescate
                            </Text>
                            <View className="justify-center self-center items-center w-96 h-96 bg-gray-500 rounded-xl">
                              <Text>logo</Text>
                            </View>
                        </View>

                        <View className="mb-16 w-1/2 self-center">
                            <View>
                                <Text className="mb-1 text-xl text-gray-700">
                                    Usuario o email{error ? <Text className="text-red-500">*</Text> : null}
                                </Text>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsernameValue}
                                    placeholder="tucorreo@ejemplo.com"
                                    autoCapitalize="characters"
                                    keyboardType="email-address"
                                    className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>

                            <View className='my-4'>
                                <Text className="mb-1 text-xl text-gray-700">
                                    Contraseña{error ? <Text className="text-red-500">*</Text> : null}
                                </Text>
                                <TextInput
                                    value={password}
                                    onChangeText={setPasswordValue}
                                    placeholder="••••••••"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50"
                                    placeholderTextColor="#9CA3AF"
                                />
                            </View>

                            {error ? (
                                <Text className="mt-1 text-lg text-red-500">{error}</Text>
                            ) : null}

                            <Pressable className="mt-4 bg-red-500 rounded-xl p-3" onPress={onLoginPress}>
                                <Text className='text-xl text-white text-center'>Entrar</Text>
                            </Pressable>
                            <Text>¿No tienes cuenta? Registrate</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
  );
};

export default LoginScreen;

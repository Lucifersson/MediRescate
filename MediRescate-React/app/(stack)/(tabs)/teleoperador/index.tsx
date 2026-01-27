import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useTeleoperador } from "@/hooks/useTeleoperador";
import { Operario } from "@/types/types";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TeleoperadorScreen = () => {

  const { onPressButton } = useTeleoperador()

  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [operario, setOperario] = useState<Operario>()

  const [mostrarUsuarios, setMostrarUsuarios] = useState(false)





  return (
    <SafeAreaView>
      <View
        className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md flex-1"
      >
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            className="w-[60px] h-[60px]" // Traducido estilo inline a NativeWind
            resizeMode="contain"
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
          />
        </View>

        <View className="flex-1 mx-4 my-8 ">
          <Text className="text-white font-bold text-lg leading-5">
            Datos teleoperador
          </Text>
        </View>

        <LogOutComponent onPress={() => null} />
      </View>

      <View className="mx-4 mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">

        <Text className="text-gray-500 font-semibold mb-2 ml-1">Título de la emergencia</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-xl mb-4 text-gray-800 border border-gray-200"
          placeholder="Ej: Accidente de tráfico"
          onChangeText={(text) => setTitulo(text)}
          value={titulo}
        />

        <Text className="text-gray-500 font-semibold mb-2 ml-1">Descripción de la emergencia</Text>
        <TextInput
          className="bg-gray-100 p-4 rounded-xl text-gray-800 border border-gray-200 text-start"
          placeholder="Detalles de la situación..."
          multiline={true}           // Permite varias líneas
          numberOfLines={4}          // Sugiere una altura inicial (Android)
          textAlignVertical="top"    // Alinea el texto arriba en Android
          style={{ minHeight: 100 }} // Asegura altura en iOS
          onChangeText={(text) => setDescripcion(text)}
          value={descripcion}
        />
      </View>


      {/* BOTÓN POSICIONADO ABAJO */}
      <View className="px-4 pb-6">
        <Pressable
          className="bg-red-500 rounded-2xl py-4 shadow-lg active:opacity-90"
          onPress={() => console.log({ titulo, descripcion })}
        >
          <Text className="text-lg font-bold text-white text-center">
            Registrar Emergencia
          </Text>
        </Pressable>
      </View>

    </SafeAreaView >
  );
};
export default TeleoperadorScreen;

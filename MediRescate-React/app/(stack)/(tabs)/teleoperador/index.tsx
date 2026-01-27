import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { Operario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tenerlo instalado
import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Ejemplo de datos
const OPERARIOS_DATA = [
  { id: '1', nombre: 'Juan Pérez' },
  { id: '2', nombre: 'María García' },
  { id: '3', nombre: 'Carlos Ruiz' },
];

const TeleoperadorScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [operario, setOperario] = useState<Operario>();
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  // const seleccionarOperario = (item) => {
  //   setOperario(item);
  //   setMostrarUsuarios(false); // Escondemos la lista al elegir
  // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. CONTENEDOR SUPERIOR (Contenido que puede crecer) */}
      <View className="flex-1">
        {/* Header */}
        <View className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md">
          <View className="bg-white/80 p-2 rounded-xl">
            <Image
              source={require("@/assets/images/logo_MediRescate.png")}
              className="w-[60px] h-[60px]" // Traducido estilo inline a NativeWind
              resizeMode="contain"
              style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
            />
          </View>
          <View className="flex-1 mx-4">
            <Text className="text-white font-bold text-lg leading-5">Datos teleoperador</Text>
          </View>
          <LogOutComponent onPress={() => null} />
        </View>

        {/* Formulario */}
        <View className="mx-4 mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Text className="text-gray-500 font-semibold mb-2 ml-1">Título de la emergencia</Text>
          <TextInput
            className="bg-gray-100 p-4 rounded-xl mb-4 text-gray-800 border border-gray-200"
            placeholder="Ej: Accidente de tráfico"
            onChangeText={setTitulo}
            value={titulo}
          />

          

          <Text className="text-gray-500 font-semibold mb-2 ml-1">Asignar Operario</Text>

          {/* BOTÓN SELECTOR DE OPERARIO */}
          <Pressable
            onPress={() => setMostrarUsuarios(!mostrarUsuarios)}
            className="flex-row justify-between items-center bg-gray-100 p-4 rounded-xl border border-gray-200 active:bg-gray-200"
          >
            <Text className={operario ? "text-gray-800" : "text-gray-400"}>
              {operario ? operario.nombre : "Elige un operario"}
            </Text>
            <Ionicons
              name={mostrarUsuarios ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
              color="gray"
            />
          </Pressable>

        {mostrarUsuarios && (
            <View className="mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
              {OPERARIOS_DATA.map((item) => (
                <Pressable 
                  key={item.id}
                 // onPress={() => seleccionarOperario(item)}
                  className="p-4 border-b border-gray-100 active:bg-red-50"
                >
                  <Text className="text-gray-700">{item.nombre}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 2. BOTÓN INFERIOR (Fuera del flex-1 anterior para quedarse abajo) */}
      <View className="px-4 pb-6">
        <Pressable
          className="bg-red-500 rounded-2xl py-4 shadow-lg active:opacity-90"
          onPress={() => console.log("Registrando...")}
        >
          <Text className="text-lg font-bold text-white text-center">
            Registrar Emergencia
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-gray-50">
        {/* Cabecera con acción */}
        <View className="p-4 flex-row justify-between items-center">
          <Text className="text-gray-500 font-black uppercase text-xs tracking-widest">
            Personal Libre
          </Text>
          <Pressable
            onPress={solicitarOperarios}
            className="bg-blue-600 px-4 py-2 rounded-full active:opacity-80"
          >
            <Text className="text-white text-xs font-bold">Actualizar</Text>
          </Pressable>
        </View>

        <FlatList
          data={operarios}
          // Usamos idOperario según tu interface NombreOperario
          keyExtractor={(item) => item.id_operario.toString()}
          renderItem={renderOperario}
          ListEmptyComponent={() => (
            <View className="mt-20 items-center justify-center px-10">
              <Ionicons name="people-outline" size={48} color="#d1d5db" />
              <Text className="text-center text-gray-400 mt-4 font-medium">
                No hay operarios disponibles en este momento o pulsa actualizar.
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TeleoperadorScreen;
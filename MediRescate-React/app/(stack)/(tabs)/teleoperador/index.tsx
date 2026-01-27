import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { NombreOperario } from "@/types/types";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tenerlo instalado
import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Ejemplo de datos
const OPERARIOS_DATA: NombreOperario[] = [
  { id_operario: 1, nombre: 'Juan Pérez' },
  { id_operario: 2, nombre: 'María García' },  //Lista operarios ficticia. TODO: RE¡emplazar por el array de operarios libres
  { id_operario: 3, nombre: 'Carlos Ruiz' },
];

const TeleoperadorScreen = () => {
  const [titulo, setTitulo] = useState("");   //Titulo de la emergencia. Es solo un string por lo que el nombre y el uso que se le de se cambia rápidamente
  const [operario, setOperario] = useState<NombreOperario | null>();  //Operario elegido de la lista de operarios libres, ya es tipo nombreOperario
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);  //Booleana para mostrar y ocultar la lista

  const seleccionarOperario = (item: NombreOperario | null) => {  // Al hacer click sobre un operario lo guarda sobre la variable operario
    setOperario(item);
    setMostrarUsuarios(false);
  };

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
              {operario && (
                 <Pressable
                className="p-4 border-b border-gray-100 active:bg-red-50"
                onPress={() => seleccionarOperario(null)}
              >
                <Text className="text-gray-400">Quitar selección</Text>
              </Pressable>
              )}
             
              {OPERARIOS_DATA.map((item) => (  //Mapeo de todos los objetos de la lista



                <Pressable
                  key={item.id_operario}
                  onPress={() => { seleccionarOperario(item) }
                  }
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


};

export default TeleoperadorScreen;
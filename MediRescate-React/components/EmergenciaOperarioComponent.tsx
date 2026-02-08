/**
 * COMPONENTE: EmergenciaOperarioComponent
 * Propósito: Visualizar la tarjeta de emergencia actual para el perfil de Operario.
 * Funcionalidad:
 * 1. Renderizado Condicional: Muestra un estado "vacío" si no hay emergencias.
 * 2. Feedback Visual Crítico: Utiliza bordes naranjas y sombras para resaltar la emergencia activa.
 * 3. Acción de Cierre: Incluye un botón para finalizar el servicio actual.
 */

import { Emergencia } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

/**
 * Propiedades del componente.
 * @param {emergencia} Objeto opcional con los datos de la emergencia asignada.
 */
interface Props {
  emergencia?: Emergencia;
}

const EmergenciaOperarioComponent = ({ emergencia }: Props) => {
  // --- ESTADO 1: SIN EMERGENCIAS ---
  // Se muestra cuando el operario está en espera o libre.
  if (!emergencia) {
    return (
      <View className="flex-1 justify-center px-6">
        <View className="bg-white h-72 w-full rounded-3xl items-center justify-center border border-gray-100 shadow-xl shadow-black/10 elevation-10">
          <Ionicons name="warning-outline" size={40} color="#374151" />
          <Text className="text-gray-400 font-medium mt-2 uppercase tracking-tighter">
            Sin avisos activos
          </Text>
          <Text className="text-gray-800 text-center font-bold text-xl px-4 mt-2">
            Datos de la emergencia
          </Text>
        </View>
      </View>
    );
  }

  // --- ESTADO 2: EMERGENCIA ACTIVA ---
  // Se muestra cuando el operario recibe una asignación del teleoperador.
  return (
    <View className="flex-1 justify-center px-6">
      {/* Contenedor con borde naranja y sombra intensa para indicar prioridad alta */}
      <View className="bg-white h-80 w-full rounded-[40px] items-center justify-between py-8 border-[3px] border-orange-500 shadow-2xl shadow-orange-500/30 elevation-12">
        {/* Cabecera del aviso */}
        <View className="items-center">
          <View className="bg-orange-100 p-3 rounded-2xl mb-2">
            <Ionicons name="warning" size={44} color="#f97316" />
          </View>
          <Text className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
            Emergencia Activa
          </Text>
        </View>
        {/* Cuerpo: Descripción de la incidencia */}
        <View className="px-8">
          <Text className="text-2xl font-black text-center text-gray-800 leading-tight">
            {emergencia.descripcion}
          </Text>
        </View>
        {/* Botón de Acción: Finalizar */}
        {/*WARNING: actualmente el boton solo es visual*/}
        {/* TODO: implementar funcion de cerrar emergencia */}
        <Pressable
          className="bg-red-600 w-[85%] h-14 rounded-full items-center justify-center shadow-md shadow-red-900/40 active:bg-red-700"
          style={({ pressed }) => [
            { transform: [{ scale: pressed ? 0.96 : 1 }] },
          ]}
        >
          <Text className="text-white font-bold text-base uppercase tracking-tight">
            Finalizar emergencia
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EmergenciaOperarioComponent;

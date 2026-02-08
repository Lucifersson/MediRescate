/**
 * COMPONENTE: EmergenciaAdminComponent
 * Propósito: Representar una tarjeta (card) individual de emergencia dentro del listado del Administrador.
 * Estructura Visual: Se divide en tres bloques horizontales: Icono de alerta, Información de la emergencia e Identificador del operario.
 */

import { EmergenciaAdmin } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

/**
 * Propiedades del componente.
 * @param {emergencia} Objeto de tipo EmergenciaAdmin que contiene la descripción e ID del operario asignado.
 */
interface Props {
  emergencia: EmergenciaAdmin;
}

const EmergenciaAdminComponent = ({ emergencia }: Props) => {
  return (
    /**
     * CONTENEDOR PRINCIPAL:
     * Diseño en fila (flex-row) con bordes redondeados y una sombra suave para resaltar sobre el fondo de la pantalla.
     */
    <View className="bg-white rounded-3xl p-4 mx-4 mb-3 shadow-sm border border-gray-100 flex-row items-center">
      {/* --- BLOQUE 1: ICONO VISUAL --- */}
      {/* Contenedor con fondo naranja suave para denotar precaución/alerta */}
      <View className="bg-orange-50 p-3 rounded-2xl mr-4">
        <Ionicons name="warning" color={"#f97316"} size={28} />
      </View>

      {/* --- BLOQUE 2: DESCRIPCIÓN DE LA EMERGENCIA --- */}
      <View className="flex-1 justify-center">
        {/* Etiqueta superior pequeña para categorizar el elemento */}
        <Text className="text-gray-400 font-black text-[9px] uppercase tracking-widest mb-0.5">
          Emergencia
        </Text>
        {/* Texto principal: Se limita a 2 líneas para mantener la consistencia visual del listado */}
        <Text
          className="text-lg font-bold text-gray-900 leading-6"
          numberOfLines={2}
        >
          {emergencia.descripcion}
        </Text>
      </View>

      {/* Separador vertical sutil entre la descripción y el ID del operario */}
      <View className="w-[1px] h-10 bg-gray-100 mx-3" />

      {/* --- BLOQUE 3: INFO ASIGNACIÓN (OPERARIO) --- */}
      <View className="items-end w-24">
        <Text className="text-[9px] font-bold text-gray-400 uppercase mb-1">
          ID Operario
        </Text>
        {/* Badge estilizado para el ID del operario asignado */}
        <View className="bg-blue-50 px-2 py-1 rounded-lg">
          <Text className="text-blue-700 font-black text-xs">
            #{emergencia.id_operario}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EmergenciaAdminComponent;

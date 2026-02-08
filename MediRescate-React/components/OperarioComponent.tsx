/**
 * COMPONENTE: OperarioComponent
 * Propósito: Renderizar la información de un trabajador en las listas del Administrador.
 * Funcionalidad:
 * 1. Muestra el nombre del operario y su unidad asignada.
 * 2. Sistema de Semáforo: Cambia dinámicamente el color y la etiqueta según el estado (Libre, En camino, Ocupado).
 * 3. Diseño: Fila horizontal optimizada para escaneo rápido de disponibilidad.
 */

import { OperariosAdmin } from "@/types/types";
import { Text, View } from "react-native";

/**
 * Propiedades del componente.
 * @param {operario} Objeto que contiene nombre, ambulancia y el estado actual del trabajador.
 */
interface Props {
  operario: OperariosAdmin;
}

const OperarioComponent = ({ operario }: Props) => {
  /**
   * getStatusConfig: Mapea el estado técnico proveniente de la DB a una configuración visual.
   * @returns {color} Código hexadecimal para el punto de estado y el texto.
   * @returns {label} Texto amigable para el usuario final.
   */
  const getStatusConfig = () => {
    switch (operario.estado) {
      case "ocupado":
        return {
          color: "#dc2626", // Rojo (Tailwind red-600)
          label: "OCUPADO",
        };
      case "en_marcha":
        return {
          color: "#f97316", // Naranja (Tailwind orange-500)
          label: "EN CAMINO",
        };
      case "libre":
      default:
        return {
          color: "#16a34a", // Verde (Tailwind green-600)
          label: "LIBRE",
        };
    }
  };

  const status = getStatusConfig();

  return (
    /**
     * CONTENEDOR PRINCIPAL:
     * Utiliza 'flex-row' para separar la información del trabajador (izquierda)
     * del indicador de estado (derecha).
     */
    <View className="bg-white rounded-2xl p-4 mb-4 mx-3 shadow-sm border border-gray-100 flex-row justify-between items-center">
      {/* --- BLOQUE IZQUIERDO: INFORMACIÓN DEL PERSONAL --- */}
      <View>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-lg font-bold text-gray-800">
            {operario.nombre}
          </Text>
        </View>

        <Text className="text-sm text-gray-500">Ambulancia asignada</Text>
        <Text className="text-base font-semibold text-gray-700">
          {operario.ambulancia}
        </Text>
      </View>

      {/* --- BLOQUE DERECHO: INDICADOR DE ESTADO (SEMÁFORO) --- */}
      <View className="flex-row items-center gap-2 ">
        {/* Punto de estado circular */}
        <View
          style={{ backgroundColor: status.color }}
          className="w-3 h-3 rounded-full"
        />
        {/* Texto de estado con color dinámico */}
        <Text style={{ color: status.color }} className="text-xs font-bold">
          {status.label}
        </Text>
      </View>
    </View>
  );
};

export default OperarioComponent;

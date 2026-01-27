import { View, Text, FlatList, Pressable } from "react-native";
import { useOperariosDisponibles } from "@/hooks/useOperariosDisponibles";
import { Ionicons } from "@expo/vector-icons";

const ListaOperariosScreen = () => {
  // Solo extraemos lo que tu hook retorna actualmente
  const { operarios, solicitarOperarios } = useOperariosDisponibles();

  const renderOperario = ({ item }: { item: any }) => (
    <View className="flex-row items-center p-4 mx-4 my-1 bg-white rounded-xl shadow-sm border border-gray-100">
      <View className="bg-green-50 p-2 rounded-full">
        <Ionicons name="person-circle-outline" size={24} color="#16a34a" />
      </View>

      <View className="ml-4 flex-1">
        <Text className="text-gray-800 font-bold text-base">{item.nombre}</Text>
        <Text className="text-gray-400 text-xs">
          ID Operario: {item.idOperario}
        </Text>
      </View>

      <Ionicons name="radio-button-on" size={12} color="#16a34a" />
      <Text className="ml-1 text-green-600 text-[10px] font-bold uppercase">
        Disponible
      </Text>
    </View>
  );

  return (
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
  );
};

export default ListaOperariosScreen;

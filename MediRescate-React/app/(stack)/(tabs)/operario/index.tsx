import { useTcpSocket } from "@/core/actions/prueba.action";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { useOperario } from "@/hooks/useOperario";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OperarioScreen = () => {
  const { enviarPeticion, response, error, loading } = useTcpSocket();
  const { user } = useAuthContext(); // 👈 Accedemos al usuario global

  // if (!user) return <Text>No hay usuario identificado</Text>;         QUITAR COMENTARIO

  const { estado, color, cambioEstado } = useOperario()
  const operariosArray = response?.data ?? [];



  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100">
      <View className={`m-6 flex-row justify-center ${color} p-5 items-center`}>
        <View className="w-20 h-20 justify-center bg-gray-300 items-center">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            style={style.image}
          />
        </View>

        <View className={`mx-5 flex-1 w-auto h-auto justify-center`}>
          <View className=" bg-gray-300 h-auto w-auto">
            <Text>{/* user.nombre */}Nombre operario</Text>           {/* QUITAR COMENTARIOS Y TEXTO TEMPORAL*/}
            <Text>{/* user.cargo */}Ambulancia Operario</Text>
          </View>
        </View>

        <Ionicons
          name="person-circle-outline"
          size={60}
          style={{ alignItems: "flex-end", justifyContent: 'center' }}
        />
      </View>


      {/* Datos de la emergencia */}
      <View className="bg-gray-300 h-60 w-60 self-center justify-center">
        <Text className="text-center">Datos de la emergencia</Text>
      </View>


      {/* Botones cambio de estado */}
      <View className="justify-center self-center">

        <Pressable className="bg-red-600 w-60 h-36 mt-10 self-center justify-center text-center rounded-lg"
          onPress={() => cambioEstado('ocupado')}
        >Ocupado
        </Pressable>

        <View className="flex-row justify-center mt-5">

          <Pressable className="bg-orange-500 w-40 h-36 mr-2.5 justify-center text-center rounded-lg"
            onPress={() => cambioEstado('camino')}
          >En camino
          </Pressable>

          <Pressable className="bg-green-600 w-40 h-36 ml-2.5 justify-center text-center rounded-lg"
            onPress={() => cambioEstado('libre')}
          >Libre
          </Pressable>

        </View>
      </View>

    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});

export default OperarioScreen;

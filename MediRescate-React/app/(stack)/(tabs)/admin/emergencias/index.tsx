import EmergenciaComponent from "@/components/EmergenciaComponent";
import LogOutComponent from "@/components/LogOut/LogOutComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { EmercgenciaAdmin } from "@/types/types";
import { router } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminOperariosScreen = () => {

  const { logout } = useAuthContext()
  const logOutHandler = () => {
    router.replace("/(stack)/login")
    logout()
  }

  //Traer arraylist de operarios,

  //const [operarios, setOperarios ] = useState<OperariosAdmin[]>()

  const emergencias: EmercgenciaAdmin[] = [

    {
      id_emergencia: 1,
      emergencia: "Accidente de tráfico con heridos leves",
      operario: "Luis Martinez"
    },
    {
      id_emergencia: 2,
      emergencia: "Paciente inconsciente en domicilio",
      operario: "Marta Díaz"
    },
    {
      id_emergencia: 3,
      emergencia: "Caída de persona mayor en vía pública",
      operario: "Fernando Alonso"
    },
    {
      id_emergencia: 4,
      emergencia: "Dolor torácico agudo",
      operario: "Fermín Aldeguer"
    },
    {
      id_emergencia: 5,
      emergencia: "Crisis asmática",
      operario: "Otro Operario"
    },

  ]



  return (
    <SafeAreaView>
      <View className="mx-4 mt-4 flex-row justify-between bg-red-500 p-4 items-center rounded-2xl shadow-md mb-5">
        <View className="bg-white/80 p-2 rounded-xl">
          <Image
            source={require("@/assets/images/logo_MediRescate.png")}
            className="w-[60px] h-[60px]"
            resizeMode="contain"
            style={{ height: 60, width: 60, transform: [{ scale: 2 }] }}
          />
        </View>
        <View className="flex-1 mx-4 items-center">
          <Text className="text-white font-bold text-lg leading-5">
            Panel Administrador
          </Text>
          <Text className="text-white/80 text-xs uppercase">
            Listado de emergencias
          </Text>
        </View>
        <LogOutComponent onPress={() => logOutHandler()} />
      </View>


      <FlatList data={emergencias}
        className="m-3"
        keyExtractor={(item) => item.id_emergencia.toString()}
        renderItem={({ item }) => <EmergenciaComponent emergencia={item} />} />



    </SafeAreaView>
  );
};

export default AdminOperariosScreen;

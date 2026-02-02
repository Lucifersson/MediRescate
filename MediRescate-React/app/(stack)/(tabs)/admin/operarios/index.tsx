import LogOutComponent from "@/components/LogOut/LogOutComponent";
import OperarioComponent from "@/components/OperarioComponent";
import { useAuthContext } from "@/core/context/UseAuthContext";
import { OperariosAdmin } from "@/types/types";
import { router } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminOperariosScreen = () => {
  const { logout } = useAuthContext();
  const logOutHandler = () => {
    router.replace("/(stack)/login");
    logout();
  };

  //Traer arraylist de operarios,

  //const [operarios, setOperarios ] = useState<OperariosAdmin[]>()

  const operarios: OperariosAdmin[] = [
    {
      id_operario: 1,
      nombre: "Juan Pérez",
      estado: "libre",
      ambulancia: "AMB-101",
    },
    {
      id_operario: 2,
      nombre: "María Gómez",
      estado: "en_marcha",
      ambulancia: "AMB-102",
    },
    {
      id_operario: 3,
      nombre: "Carlos Rodríguez",
      estado: "ocupado",
      ambulancia: "AMB-103",
    },
    {
      id_operario: 4,
      nombre: "Lucía Fernández",
      estado: "libre",
      ambulancia: "AMB-104",
    },
    {
      id_operario: 1,
      nombre: "Juan Pérez",
      estado: "libre",
      ambulancia: "AMB-101",
    },
    {
      id_operario: 2,
      nombre: "María Gómez",
      estado: "en_marcha",
      ambulancia: "AMB-102",
    },
    {
      id_operario: 3,
      nombre: "Carlos Rodríguez",
      estado: "ocupado",
      ambulancia: "AMB-103",
    },
    {
      id_operario: 4,
      nombre: "Lucía Fernández",
      estado: "libre",
      ambulancia: "AMB-104",
    },
    {
      id_operario: 1,
      nombre: "Juan Pérez",
      estado: "libre",
      ambulancia: "AMB-101",
    },
    {
      id_operario: 2,
      nombre: "María Gómez",
      estado: "en_marcha",
      ambulancia: "AMB-102",
    },
    {
      id_operario: 3,
      nombre: "Carlos Rodríguez",
      estado: "ocupado",
      ambulancia: "AMB-103",
    },
    {
      id_operario: 4,
      nombre: "Lucía Fernández",
      estado: "libre",
      ambulancia: "AMB-104",
    },
    {
      id_operario: 1,
      nombre: "Juan Pérez",
      estado: "libre",
      ambulancia: "AMB-101",
    },
    {
      id_operario: 2,
      nombre: "María Gómez",
      estado: "en_marcha",
      ambulancia: "AMB-102",
    },
    {
      id_operario: 3,
      nombre: "Carlos Rodríguez",
      estado: "ocupado",
      ambulancia: "AMB-103",
    },
    {
      id_operario: 4,
      nombre: "Lucía Fernández",
      estado: "libre",
      ambulancia: "AMB-104",
    },
  ];

  return (
    <SafeAreaView className="flex-1">
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
            Listado de operarios
          </Text>
        </View>
        <LogOutComponent onPress={() => logOutHandler()} />
      </View>

      <FlatList
        data={operarios}
        keyExtractor={(item) => item.id_operario.toString()}
        renderItem={({ item }) => <OperarioComponent operario={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default AdminOperariosScreen;

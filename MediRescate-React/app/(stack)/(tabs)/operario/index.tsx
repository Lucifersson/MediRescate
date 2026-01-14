import { Pressable, View, Text } from "react-native";
import useTcpSocket from "@/core/actions/prueba.action";

const OperarioScreen = () => {
  return (
    <View>
      <Text>Operario</Text>
      <Pressable
        className="p-6 bg-purple-800"
        onPress={() => enviarMensajeServidor()}
      >
        <Text>Enviar</Text>
      </Pressable>
    </View>
  );
};

export default OperarioScreen;

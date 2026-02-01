import { Redirect } from "expo-router";
import { View, Text } from "react-native";

const AdminScreen = () => {
  return <Redirect href={"/(stack)/(tabs)/admin/operarios"} />;
};

export default AdminScreen;

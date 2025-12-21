import { Redirect } from "expo-router";
import { View, Text } from "react-native";

const index = () => {
  return <Redirect href={"/login"} />;
};

export default index;

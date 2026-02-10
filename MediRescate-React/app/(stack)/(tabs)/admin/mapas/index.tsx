import { useMemo } from "react";
import {
  Alert,
  Linking,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

const MAP_CENTER = {
  latitude: 40.4168,
  longitude: -3.7038,
};

const MARKERS = [
  "color:red|label:E|40.4168,-3.7038",
  "color:blue|label:H|40.4198,-3.7073",
  "color:green|label:A|40.413,-3.7015",
];

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const AdminMapasScreen = () => {
  const { width } = useWindowDimensions();

  const staticMapUrl = useMemo(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      return null;
    }

    const mapWidth = Math.max(320, Math.floor(width) - 32);
    const mapHeight = 380;
    const markersQuery = MARKERS.map((marker) => `markers=${encodeURIComponent(marker)}`).join("&");

    return `https://maps.googleapis.com/maps/api/staticmap?center=${MAP_CENTER.latitude},${MAP_CENTER.longitude}&zoom=14&size=${mapWidth}x${mapHeight}&scale=2&maptype=roadmap&${markersQuery}&key=${GOOGLE_MAPS_API_KEY}`;
  }, [width]);

  const openGoogleMaps = async () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${MAP_CENTER.latitude},${MAP_CENTER.longitude}`;
    const supported = await Linking.canOpenURL(mapsUrl);

    if (!supported) {
      Alert.alert("No se pudo abrir Google Maps");
      return;
    }

    await Linking.openURL(mapsUrl);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4 py-4">
      <Text className="text-xl font-bold text-gray-800">Mapa de emergencias</Text>
      <Text className="text-sm text-gray-500 mt-1">
        Vista del área operativa usando Google Maps API.
      </Text>

      <View className="mt-4 rounded-2xl overflow-hidden border border-gray-200 bg-white">
        {staticMapUrl ? (
          <Image
            source={{ uri: staticMapUrl }}
            style={{ width: "100%", height: 380 }}
            contentFit="cover"
            transition={150}
          />
        ) : (
          <View className="h-[380px] items-center justify-center px-4">
            <Text className="text-center text-gray-600 font-semibold">
              Configura EXPO_PUBLIC_GOOGLE_MAPS_API_KEY para visualizar el mapa.
            </Text>
          </View>
        )}
      </View>

      <Pressable
        onPress={openGoogleMaps}
        className="mt-4 rounded-xl bg-red-500 py-3 px-4 active:opacity-80"
      >
        <Text className="text-center text-white font-semibold">Abrir en Google Maps</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AdminMapasScreen;
